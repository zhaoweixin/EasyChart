<template>
    <div id="blueEditor">
        <vs-popup fullscreen title="Preview" :active.sync="popupActivo4">
            <div>
                <el-header style="height:auto;">
                    <div>
                        <p>Edit Interaction</p>
                    </div>
                    <div>
                        <el-button size="small" type="primary" @click="calculator('Filter')" class="buttonInner">Filter</el-button>
                        <el-button size="small" type="primary" @click="calculator('Sum')" class="buttonInner">Sum</el-button>
                        <el-button size="small" type="primary" @click="calculator('Reduce')" class="buttonInner">Reduce</el-button>
                        <el-button size="small" type="primary" @click="calculator('Multi')" class="buttonInner">Multi</el-button>
                        <el-button size="small" type="primary" @click="close" class="buttonInner">Close</el-button>
                    </div>
                </el-header>
                <el-main>
                    <div id='preview' style="background:rgba(0,0,0,0.05)"><svg id ='editorborad'></svg></div>
                </el-main>
            </div>
        </vs-popup>
    </div>
</template>
<script>
import * as d3 from 'd3'
import BlueprintLine from "./blueprintLine"
import BlueComponent from "./blueComponent"
import modelConfig from "../../assets/modelConfig2.json"
import blueComponentTypes from "../../assets/blueComponentTypes.json"
import dashboardVue from '../dashboard/dashboard.vue';
import axios from "axios";
export default {
    name:'blueEditor',
    data(){
        return{
            container: null,
            component:[
                {"name": "linechart_vega", "interaction": "controlled"},
                {"name": "Barchart", "interaction": "controler"},
                {"name": "Barchart", "interaction": "controler"},
                {"name": "scatter_vega", "interaction": "controlled"}
            ],
            drawingLine: "", //The line which is being darwing by user
            mouseAction: "", //mouse action label which used to change the mouse action state
            componentTypes: blueComponentTypes, // components' types of blueprint
            blueComponentsTypeCount:{}, //store the count of component according to different type
            dataList: [], //data candidates list
            modelConfig: modelConfig, //configuration detail of each component model
            selectedData: {}, //The dimensions in dataset which been selected by user
            dataComponent: {}, //The exsiting components in canvas (used to check the exsiting)
            blueComponents: [], //The exsiting components in canvas (used to store the exsiting)
            blueLines: [], //Store the connections between component which connected by curve
            contextData: "", //Shows which dataset which is using in blueprint
            dataConnection:{}, //unknown function
            loadedDatasets:{}, //accroding datacomponent to loaded datasets
            blueLinesName:[], // store the links between components
            blueComponentNameList:[], //the index made of componentid
            exstingPorts:[], //all of the component port in blueprint
            vegaObjectObj:{}, //vegaobject is used to generate graph throgh
            chartData:{}, //store the data in different chart
            comChartCount:{}, // chart count -> distinguish chart
            chartLayout:{}, //layout is the preset typesetting
            chartLayoutObj:{}, //更新chartLayoutObj 用于存储layout-port-config
            layoutIdName:{}, //{"layout-0": "Template A"}
            layoutlist: ["A", "B"],
            A: false,
            B: false,
            tableData:null,
            isTable:false,
            model_config_text:"", // store configuration of chart
            calculatorDict:{},
            controlComponentCount:{
                "controler": 0,
                "controlled": 0,
                "curler": 0,
                "curled": 0
            },
            componentGraph:[],
            dataMapper:{}

        }
    },
    computed:{
        popupActivo4 () {
            return this.$store.state.popUp
        },
        _components () {
            return this.$store.getters.getChartComponentArray
        }
    },
    watch:{
        popupActivo4: {
            handler(val, oldVal){
                console.log(val, oldVal)
            }
        },
        _components : {
            handler(val, oldVal){
                this.addComponent(val[val.length-1])
            },
            deep:true
        },
        //Monitor the positon's change of component
        blueComponents: {
            handler(curVal, oldVal) {
                let that = this
                if(curVal.length == oldVal.length){
                    for (let i = 0; i < this.blueComponents.length; i++){
                        if(this.blueComponents[i].isDelete){
                            that.remove(this.blueComponents[i])
                            break;
                        }

                        let curEle = curVal[i];
                        let preEle = oldVal[i];
                        //Obtain the newest postion of each component
                        let curPos = curEle.getPos();
                        let prePos = preEle.getPos();
                        if(this.blueLines.length > 0){
                            this.blueLines.forEach(function(line, i){
                                //寻找与组件相关的blueLines
                                let connectInfo = line.getConnectInfo()
                                if(connectInfo.sourceId == curEle.getId() || connectInfo.targetId == curEle.getId()){
                                    line.parentPosUpdated(
                                        curPos.dx, //delta of horizon postion
                                        curPos.dy, //delta of vertical position
                                        curEle.inPorts,
                                        curEle.outPorts,
                                        curEle.id
                                    )
                                }
                                curEle.resetDeltaPos();
                                preEle.resetDeltaPos();
                            })
                        }
                    }
                }
            },
            deep: true
        },

        //Monitor the bluelines' length, if length increased, the new connection will be parsed
        blueLines: {
            handler(curVal, oldVal) {
                if(curVal.length != 0){
                let tailNo = curVal.length - 1;
                this.catchConnect(curVal[tailNo])
                }
            },
            deep: true
        }
    },
    mounted() {
        let that = this;
        this.chartInit("#preview");
        setInterval(function() {
            that.blueLines.forEach(function(line) {
                line.animate();
            });
        }, 20);
    },
    methods:{
        close: function(){
            let that = this
            let controlledCom = []
            this.blueComponentNameList.forEach( (d,i) => {
                let com = that.getComponentById(d)
                if(com.control == "controlled"){
                    controlledCom.push(d)
                }
            })
            //that.componentGraph
            //this.blueComponentNameList
            for(let i=0; i<controlledCom.length; i++){
                let controlledIndex = this.blueComponentNameList.indexOf(controlledCom[i])
                for(let j=0; j<this.blueComponentNameList.length; j++){
                    if(this.componentGraph[j][controlledIndex] == 1){
                        //link
                        let source = this.blueComponentNameList[j],
                            target = this.blueComponentNameList[controlledIndex],
                            linkList = this.getblueLinesByLinkName(source + "_" + target)
                        for(let k=0; k<linkList.length; k++){
                            let link = linkList[k],
                                targetname = link["target"]["name"]
                            for(let l=0;l<that.dataMapper[link.targetId]["mapper"].length; l++){
                                if(that.dataMapper[link.targetId]["mapper"][l]["dataname"] == targetname){
                                    that.dataMapper[link.targetId]["mapper"][l]["mapfrom"]["source"] = link["source"]
                                }
                            }
                        }
                    }
                }
            }
            this.$store.commit("updateDataMapper", that.dataMapper)
            //console.log(controlledCom, this.blueComponentNameList, that.componentGraph)
            this.$store.commit("editInteraction")
        },
        chartInit(props){
            let that = this;

        let bluecomponentscountInit = function(that){
            //init blue componets counts
            for(const key in that.componentTypes){
                if(key == "Chart"){
                    that.componentTypes[key]["childrens"].forEach( (d,i) => {
                    if(!that.comChartCount.hasOwnProperty(d)){
                        that.comChartCount[d] = 0
                    }
                    })
                }
                if(!that.blueComponentsTypeCount.hasOwnProperty(key)){
                    that.blueComponentsTypeCount[key] = 0
                }
            }
        }

        this.container = d3.select("#editorborad");
        this.container.append("g").attr("id", "grid_layer");
        this.chartResize(window.innerWidth * 0.95, window.innerHeight * 0.81);
        bluecomponentscountInit(that)
        //this.addComponent()
        },
        chartResize(innerWidth, innerHeight){
            let that = this
            let height = innerHeight > innerWidth * 2 ? innerWidth * 2 : innerHeight;
            let width = innerWidth;
            this.width = width;
            this.height = height;
            let drawGrids = function(that){
            //Darwing the grids line in canvas which help user the recognize the canvas and components
                let lineData = [];
                for (let i = 10; i < that.width; i += 20) {
                    lineData.push({ x1: i, y1: 0, x2: i, y2: that.height });
                }

                for (let i = 10; i < that.height; i += 20) {
                    lineData.push({ x1: 0, y1: i, x2: that.width, y2: i });
                }

                if (that.container != "") {
                    that.container
                        .select("#grid_layer")
                        .selectAll("*")
                        .remove();

                    that.container
                        .select("#grid_layer")
                        .selectAll(".grid_lines")
                        .data(lineData)
                        .enter()
                        .append("line")
                        .attr("x1", d => d.x1)
                        .attr("x2", d => d.x2)
                        .attr("y1", d => d.y1)
                        .attr("y2", d => d.y2)
                        .attr("stroke", "#00000030");
                }
            }
            d3.select("#editorborad")
                .attr("width", this.width)
                .attr("height", this.height);

            drawGrids(that)
        },
        addComponent(com){
            let that = this;
            if(com.interaction == "controler"){
                that.controlComponentCount['controler'] ++
            }else if(com.interaction == "controlled"){
                that.controlComponentCount['controlled'] ++
            }
            that.createNewComponent(com.name)
        },
        createNewComponent(){
            let that = this,
            property = null,
            _com = null;
            //func
            const addLineEvent = function(that, com){
                //darwing the connection line accroding to the mouse real-time position
                that.container.on("mousemove", function(d) {
                if (
                    that.mouseAction == "drawing_line" &&
                    that.drawingLine.getConnectInfo()["target"] == ""
                ) {
                    let coordinates = d3.mouse(this);
                    that.drawingLine.dynamicGenerateCurveLine(coordinates);
                    that.drawingLine.findNearestPoint(coordinates, that.exstingPorts);
                }
                });
            }
            const addClickEvent2Circle = function(that, com){
                //boundind the click event to the circles which represent the ports in component
                //after click the circle, there will new a line in canvas
                com.getAllCircles().on("click", function(d) {
                    let params = com.getParmas()
                    let x = d.parentX + d.x;
                    let y = d.parentY + d.y;
                    let sourceid = params.id
                    let line = (that.drawingLine = new BlueprintLine(
                        that.container,
                        params.name,
                        [x, y],
                        d,
                        sourceid
                    ));
                that.blueLines.push(line);
                that.mouseAction = "drawing_line";

                let allPorts = [];

                that.blueComponents.forEach(function(component,i) {
                    //let ports = component.getAllPorts();
                    let parmas = component.getParmas()
                    let _inPorts = parmas["inPorts"]
                    let _outPorts = parmas["outPorts"]
                    let _id = parmas["id"]
                    if (d.type == "in") {
                    _outPorts.forEach(function(k) {
                        //k.parent = component.id
                        k.id = _id
                        allPorts.push(k);
                    });
                    } else {
                    _inPorts.forEach(function(k) {
                        //k.parent = component.id
                        k.id = _id
                        allPorts.push(k);
                    });
                    }
                });

                that.exstingPorts = []
                that.exstingPorts = allPorts
                //line.setExstingPorts(allPorts);
                addLineEvent(that, com)
                });
            }
            const constructproperty = function(that, property, name){
                let obj = JSON.parse(JSON.stringify(property))
                //according to this.blueComponentsTypeCount construct id and add 1
                //make inports outports full
                //make sure that the viewer name equal to button content
                obj["fill"] = that.componentTypes[obj.type].color;
                obj["name"] = name;
                obj['control'] = null;
                obj['id'] = obj.type + '-' + that.blueComponentsTypeCount[obj.type];
                let interactionType = obj['interaction'],
                    chartType = obj['type']

                if(interactionType == "controlled"){
                    let gap = window.innerHeight * 0.81 / (that.controlComponentCount["controlled"] + 1)
                    obj['x'] = 1300;
                    obj['y'] = 200 + gap * that.controlComponentCount["curled"];
                    that.controlComponentCount["curled"] ++;
                    obj['control'] = "controlled"
                }else if(interactionType == "controler"){
                    let gap = window.innerHeight * 0.81 / (that.controlComponentCount["controlled"] + 1)
                    obj['x'] = 300;
                    obj['y'] = 200 + gap * that.controlComponentCount["curler"];
                    that.controlComponentCount["curler"] ++;
                    obj['control'] = "controler"
                }

                if(chartType == 'Caculator'){
                    obj['x'] = 800;
                    obj['y'] = 500;
                }else if(chartType == 'Processor'){
                    obj['x'] = 800;
                    obj['y'] = 100;
                }

                if(obj.inPorts != undefined){
                    for(let i=0; i<obj.inPorts.length; i++){
                        obj.inPorts[i]["parentX"] = obj['x'];
                        obj.inPorts[i]["parentY"] = obj['y'];
                        obj.inPorts[i]["parent"] = obj['name'];
                        obj.inPorts[i]["parentid"] = obj['id'];
                    }
                }
                if(obj.type != "Layout"){
                    //layout do not have layout
                    if(obj.outPorts != undefined){
                        for(let i=0; i<obj.outPorts.length; i++){
                            obj.outPorts[i]["parentX"] = obj['x'];
                            obj.outPorts[i]["parentY"] = obj['y'];
                            obj.outPorts[i]["parent"] = obj['name'];
                            obj.outPorts[i]["parentid"] = obj['id'];
                        }
                    }
                }else if(obj.type == "Layout"){
                    that.layoutIdName[obj.id] = {}
                    that.layoutIdName[obj.id]["name"] = obj.name
                    that.layoutIdName[obj.id]["ref"] = "msg" + "-" + obj.name.split(" ")[1]
                }

                if(obj.type == "Chart"){
                    let propertiesname = obj.name + "-" + that.comChartCount[obj.name];
                    that.comChartCount[obj.name] = that.comChartCount[obj.name] + 1
                }
                that.blueComponentsTypeCount[obj.type] = that.blueComponentsTypeCount[obj.type] + 1
                _com = new BlueComponent(that.container, obj);

                if(obj.inPorts.length != 0){
                    let dic = {
                        "name": obj.name,
                        "id": obj.id,
                        "type":obj.type,
                        "control": obj.control,
                        "mapper":[]
                    }
                    obj.inPorts.forEach( (d,i) => {
                        dic["mapper"].push({
                            "dataname": d.name,
                            "dataType": "string",
                            "mapfrom": {
                                "operator": null,
                                "source": ''
                            },
                            "alias": null
                        })
                    })
                    that.dataMapper[obj.id] = dic
                }
                that.blueComponents.push(_com);
                addClickEvent2Circle(that, _com);
            }
            const dimensionSelected = function(that, source, dim){
                dim.checked = !dim.checked;
                if (dim.checked == true) dim.color = "#808080";
                else dim.color = "#202020";

                //forced update datalist to re-rendering
                let origin = that.dataList;
                that.dataList = [];
                that.dataList = origin;

                if (that.selectedData[source] != undefined) {
                //如果存在该数据源
                if (that.selectedData[source][dim.name] != undefined) {
                    //如果存在该数据源该属性
                    that.selectedData[source][dim.name] = "0";
                } else {
                    //如果存在该数据源不存在该属性
                    that.selectedData[source][dim.name] = "1";
                    that.dataComponent[source].addPort("out", {
                    name: dim.name,
                    text: dim.name,
                    dimension_type: dim.type,
                    type: "out",
                    attr: "field"
                    });
                    addClickEvent2Circle(that, that.dataComponent[source]);
                }
                } else {
                //如果不存在该数据源 则初始化组件
                that.selectedData[source] = {}; //记录该数据源记录该数据源
                that.selectedData[source][dim.name] = "1";

                let properties = that.modelConfig["Table"];
                properties["outPorts"] = [
                    {
                    name: dim.name,
                    text: dim.name,
                    dimension_type: dim.type,
                    type: "out",
                    attr: "field"
                    }
                ];
                properties["fill"] = "#F6BB42";
                properties["name"] = source;
                properties["id"] = source;
                properties['x'] = 300 * Math.random() + 100;
                properties['y'] = 300 * Math.random() + 100;

                let _com = new BlueComponent(that.container, properties);
                that.dataComponent[source] = _com;
                addClickEvent2Circle(that, _com);
                that.blueComponents.push(_com);

                if (!(source in that.loadedDatasets)){
                    dataHelper.getDataDetail(source).then(function(response) {
                    //that.vegaObject.setData(response.data.data.values);
                    that.loadedDatasets[source] = response.data.data.values
                    });
                }
                }
            }

            let _name = arguments[0]
            console.log(arguments[0], that.modelConfig)
            constructproperty(that, that.modelConfig[_name], _name)
        },
        remove(com){
            //find line connected with removedComponent
            //Cancellation bluecomponent and blueline methods: = null / delete in array
            //delete related variable
            let that = this,
                comid = com.getId(),
                comtype = com.getType()

            //first removeGraph bluecomponent
            com.removeGraph()
            //second find connected blueline/ removed graph/ delete in array
            for(let i=0; i<that.blueLines.length; i++){
                let lineinfo = that.blueLines[i].getConnectInfo()
                let _source = lineinfo.sourceId,
                    _target = lineinfo.targetId,
                    linkname = _source + "_" + _target

                if(comid == _source || comid == _target){
                that.blueLines[i].forceRemove();
                that.blueLines[i] = null;
                that.blueLines.splice(i, 1);
                i--;

                let index = that.blueLinesName.indexOf(linkname)
                that.blueLinesName.splice(index, 1)
                }
            }

            //third delete component in array
            for(let i=0; i<this.blueComponents.length; i++){
                if(comid == this.blueComponents[i].getId()){
                this.blueComponents[i] = null;
                this.blueComponents.splice(i, 1);

                break;
                }
            }

            //remove ports
            for(let i=0; i<that.exstingPorts.length; i++){
                if(comid == that.exstingPorts[i].parentid){
                this.exstingPorts.splice(i, 1);
                }
            }

            if(comtype == "Data"){
                delete that.selectedData[comid]
                delete that.dataComponent[comid]
            }else if(comtype == "Viewer" || comtype == "Chart"){
                let index = comid.split("-")[1]
                that.viewerbuttonbox[index]["content"] = "button" + index
                that.viewerbuttonbox[index]["style"] = "none"
                that.viewerbuttonbox[index]["id"] = ""
                that.blueComponentsTypeCount[comtype] = that.blueComponentsTypeCount[comtype] + 1
            }
            that.blueComponentsTypeCount[comtype] = that.blueComponentsTypeCount[comtype] - 1
            // if exist viewer, "delete" remove button
            if(that.blueComponentNameList.length > 0){
                that.blueComponentNameList.splice(that.blueComponentNameList.indexOf(comid), 1)
            }
        },
        catchConnect(connect){
            // catch ConnectInfo
            let that = this
            let interval = function(){
                let i = 0;
                let intr = setInterval(function() {
                let conInfo = connect.getConnectInfo()
                if (conInfo.targetId != ""){
                    clearInterval(intr);
                    that.buildBlueGraph(connect)
                }
                }, 500)
            }
            interval()
        },
        getComponentById(id) { //by id
        for (let i = 0; i < this.blueComponents.length; i++) {
            if (id == this.blueComponents[i].getId()) {
                return this.blueComponents[i];
            }
        }
        },
        getblueLinesByLinkName(name){
            //name sourceId_targetId Chart-0_Chart-1
            let list = []
            this.blueLines.forEach( (d,i) => {
                let connect = d.getConnectInfo()
                let linkName = connect.sourceId + '_' + connect.targetId
                if(linkName == name){
                    list.push(connect)
                }
            })
            return list
        },
        buildBlueGraph(con){
            //console.log(that.blueLines)
            let that = this
            let connect = con.getConnectInfo()
            let _source = connect.source
            let _target = connect.target
            //two dimensional matrix of storage blueprint connection logic

            //更新that.chartlayoutObj viewer- layout-0_chartA parentid + "_" + text
            if(_target.attr == "Layout"){
                //建立索引 用于更新layout-port
                if(that.chartLayout[_source["parentid"]] == undefined){
                that.chartLayout[_source["parentid"]] = []
                let _name = _target.id + "_" + _target.text
                that.chartLayout[_source["parentid"]].push(_name)
                }else{
                let _name = _target.id + "_" + _target.text
                that.chartLayout[_source["parentid"]].push(_name)
                }

                //更新chartLayoutObj 用于存储layout-port-config
                if(that.chartLayoutObj[_target["id"]] == undefined){
                that.chartLayoutObj[_target["id"]] = {}

                that.chartLayoutObj[_target["id"]][_target["text"]] = ""
                that.chartLayoutObj[_target["id"]][_target["text"]] = JSON.parse(JSON.stringify(that.vegaObjectObj[_source["parentid"]]))

                }else{
                if(that.chartLayoutObj[_target["id"]][_target["text"]] == undefined){

                    that.chartLayoutObj[_target["id"]][_target["text"]] = ""
                    that.chartLayoutObj[_target["id"]][_target["text"]] = JSON.parse(JSON.stringify(that.vegaObjectObj[_source["parentid"]]))
                }
                }
            }

            //每增加一条边就更新
            //首先处理componentIndex

            let linkname = connect.sourceId + "_" + connect.targetId
            let addId = [connect.sourceId, connect.targetId]
            addId.forEach(function(d){
                if(that.blueComponentNameList.indexOf(d) == -1){
                that.blueComponentNameList.push(d)
                }
            })
            //存入link
            if(this.blueLinesName.indexOf(linkname) == -1){
                this.blueLinesName.push(linkname)
            }
            //建立根据componentIndex覆盖更新二维数组
            this.blueComponentNameList.forEach(function(d, i){
                that.componentGraph[i] = new Array()
            })
            //graph init
            for(let i=0; i<this.blueComponentNameList.length; i++){
                for(let j=0; j<this.blueComponentNameList.length; j++){
                that.componentGraph[i][j] = 0
                }
            }
            for(let i=0; i<this.blueLinesName.length; i++){
                let indexsource = this.blueComponentNameList.indexOf(String(this.blueLinesName[i]).split('_')[0])
                let indextarget = this.blueComponentNameList.indexOf(String(this.blueLinesName[i]).split('_')[1])
                that.componentGraph[indexsource][indextarget] = 1
            }
        },
        calculator(option){
            this.createNewComponent(option)
        }
    }
}
</script>
<style>
.el-header {
    background-color: rgb(229, 235, 241);
    color: #333;
    text-align: center;
    line-height: 40px !important
}
.buttonInner {
    display: inline-block;
}
.el-main{
    padding: 5px !important
}
</style>
