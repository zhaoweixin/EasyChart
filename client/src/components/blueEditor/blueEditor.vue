<template>
    <div id="blueEditor">
        
        <vs-popup title="Editor" fullscreen :active.sync="popupActivo4" icon-close="close" style="">
            
            <div>
                <el-page-header @back="close" content="详情页面">
                </el-page-header>
                <el-container>
                    <el-aside style="text-align: center;  height: 950px; width:200px">
                        <el-divider content-position="center" style="font-size:16px; color:#333; font-weight:700">Function Panel</el-divider>
                        <div style="padding-top:5%">
                            <vs-row vs-justify="center">
                                <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
                                    <vs-card>
                                    <div slot="header">
                                        <h5>
                                        Tool Boxs
                                        </h5>
                                    </div>

                                    <div>
                                        <el-collapse v-model="activeNames">
                                            <el-collapse-item title="Mouse Action" name="1">
                                                <el-row style="padding-top:10px">
                                                    <vs-radio v-model="radios" vs-value="Connection" @click="changeMouseActionType('Connection')">Connection</vs-radio>
                                                </el-row>
                                                <el-row style="padding-top:10px">
                                                    <vs-radio color="success" v-model="radios" vs-value="Filter" @click="changeMouseActionType('Filter')">Filter</vs-radio>
                                                </el-row>
                                                <el-row style="padding-top:10px">
                                                    <vs-radio color="warning" v-model="radios" vs-value="Highlight" @click="changeMouseActionType('Highlight')">Highlight</vs-radio>
                                                </el-row>
                                            </el-collapse-item>
                                            <el-collapse-item title="Focus" name="2">
                                                <el-row>
                                                    <vs-button type="flat" style="width:150px" color="#B81D17" @click="refresh">Refresh</vs-button>
                                                </el-row>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                    </vs-card>
                                </vs-col>
                            </vs-row>
                        </div>

                        <div>
                            
                        </div>
                        
                        </el-aside>
                    <el-container style="padding-left:2%">
                        <el-header style="height:50px">
                            <el-row >
                                <el-divider content-position="center" style="font-size:16px; color:#333; font-weight:700">Editor Panel</el-divider>
                            </el-row>
                        </el-header>
                        <el-main>
                            <div id='preview' style="background:rgba(0,0,0,0.05); box-shadow:0 2px 12px 0 rgba(0,0,0, 0.1)">
                                <div class="panelButtons" style="position:absolute; padding:1%">
                                        <vs-button radius color="primary" type="filled" icon="delete" @click="deleteLine()"></vs-button>
                                        <vs-button radius color="primary" type="filled" icon="undo" style="transform:translate(15px)" ></vs-button>
                                </div>
                                <svg id ='editorborad'></svg>
                            </div>
                        </el-main>
                    </el-container>
                </el-container>
            </div>
        </vs-popup>
        <!--
        <vs-popup title="Edit Interaction" fullscreen :active.sync="popupActivo4" :button-close-hidden="buttonclosehidden">

        </vs-popup>
        -->
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
            buttonclosehidden:true,
            activeNames: ['0'],
            container: "", //canvas to drawing blueprint
            componentTypes: blueComponentTypes, // components' types of blueprint
            modelConfig: modelConfig, //configuration detail of each component model
            comChartCount:{}, // chart count -> distinguish chart
            blueComponentsTypeCount:{}, //store the count of component according to different type
            dataComponent: {}, //The exsiting components in canvas (used to check the exsiting)
            blueComponents: [], //The exsiting components in canvas (used to store the exsiting)
            selectedData: {}, //The dimensions in dataset which been selected by user
            loadedDatasets:{}, //accroding datacomponent to loaded datasets
            width: null,
            height: null,
            drawingLine: null, //The line which is being darwing by user,
            blueLines: [], //Store the connections between component which connected by curve
            mouseAction: "", //mouse action label which used to change the mouse action state
            exstingPorts:[], //all of the component port in blueprint
            lineColor:{
                "Chart": "#967ADC",
                "Caculator": "#37BC9B",
                "Layout": "#37BC22",
                "Data": "#F6BB42"
            },
            blueLinesDelSignal:false, //true has been delete
            chartLayout:{}, //layout is the preset typesetting
            chartLayoutObj:{}, //更新chartLayoutObj 用于存储layout-port-config
            blueComponentNameList:[], //the index made of componentid
            componentGraph:[],
            vegaObjectObj:{}, //vegaobject is used to generate graph throgh
            chartData:{}, //store the data in different chart
            controlComponentCount:{
                "controler": 0,
                "controlled": 0,
                "curler": 0,
                "curled": 0
            },
            dataMapper:{},
            lastBlueLines:[],
            blueLinesName:[], // store the links between components,
            mouseActionType:{
                "text":'Attribute Mapping',
                "color": "#838DFF",
                "index": 1
            },
            h5Style:{
                'background':"#838DFF",
                'border-radius': '7px',
                "transition": "all .5s ease"
            },
            radios:'Connection',
            dragble:{
                "flag": false,
                "startLoc": [],
                "endLoc": [],
                "clickTime": [],

            }
            

        }
    },
    computed:{
        popupActivo4 :{
            get: function(){
                return this.$store.state.popUp
            },
            set: function(){
                this.$store.commit("editInteraction")
            }
        },
        _components: {
            get: function(){
                return this.$store.getters.getChartComponentArray
            },
            set: function(){

            }
        }
    },
    watch:{
        popupActivo4: {
            handler(val, oldVal){
            }
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
                let that = this

                if(that.blueLinesDelSignal == true){
                    // deleted blueprint line has been removed
                    // update bluegraph map using option 'afterdelete'
                    // turn blueLinesDelSignal to false
                    that.blueLinesDelSignal = false
                    that.catchConnect("afterdelete")
                    that.lastBlueLines = []
                    curVal.forEach(d => {
                        that.lastBlueLines.push(d)
                    })
                }else if(that.blueLinesDelSignal == false){
                    if(curVal.length > that.lastBlueLines.length && curVal.length != 0){
                        //add line
                        that.catchConnect("add")
                    }
                    if(curVal.length < that.lastBlueLines.length){
                        //delete line
                        if(curVal.length == 0){
                        // empty relative items
                            this.catchConnect("empty")
                        }else{
                            this.catchConnect("delete")
                        }
                    }
                    that.lastBlueLines = []
                    curVal.forEach(d => {
                        that.lastBlueLines.push(d)
                    })
                }
            }
        },

        _components : {
            handler(val, oldVal){
                this.addComponent(val[val.length-1])
            },
            deep:true
        },
        radios: {
            handler(val, oldVal){
                this.changeMouseActionType(val)
            },
            deep:true
        }
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
                    if(this.componentGraph[j] != undefined && this.componentGraph[j][controlledIndex] == 1){
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
            this.$store.commit("editInteraction")
        },
        calculator(option){
        },
        chartInit(container, props) {
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
            this.chartResize(window.innerWidth * 0.815, window.innerHeight * 0.8);
            bluecomponentscountInit(that)
            this.containerListener()
        },
        //Resize the canvas after window's size has been updated
        chartResize(innerWidth, innerHeight) {
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

            drawGrids(that);
        },
        //container listener
        containerListener(){
            //distinguish click and dblclick
            let that = this
            function deleteSingleLine() {
                that.drawingLine.remove()
                that.blueLines.pop()
                that.mouseAction == ""
                that.container.on("mousemove", null)
            }

            let svg = d3.select("#editorborad")
            let rect = svg.append("rect")
                .attr("width", 0)
                .attr("height", 0)
                .attr("fill", "rgba(33,20,50,0.3)")
                .attr("stroke", "#ccc")
                .attr("stroke-width", "2px")
                .attr("transform", "translate(0,0)")
                .attr("id", "squareSelect");


            svg.on("mousedown.drag", function(d){
                that.dragble.flag = true
                rect.attr("transform", "translate(" + d3.event.layerX + "," + d3.event.layerY + ")");
                that.dragble.startLoc = [d3.event.layerX, d3.event.layerY];
                that.blueLines.forEach((d,i) => {
                    d.dishighLight()
                    d.toDelete()
                })
            })
            svg.on("mousemove.drag", function(d){
                if (d3.event.target.localName == "svg" && that.dragble.flag == true || d3.event.target.localName == "rect" && that.dragble.flag == true) {
                    var width = d3.event.layerX - that.dragble.startLoc[0];
                    var height = d3.event.layerY - that.dragble.startLoc[1];
                    if (width < 0) {
                        rect.attr("transform", "translate(" + d3.event.layerX + "," + that.dragble.startLoc[1] + ")");
                    }
                    if (height < 0) {
                        rect.attr("transform", "translate(" + that.dragble.startLoc[0] + "," + d3.event.layerY + ")");
                    }
                    if (height < 0 && width < 0) {
                        rect.attr("transform", "translate(" + d3.event.layerX + "," + d3.event.layerY + ")");
                    }
                    rect.attr("width", Math.abs(width)).attr("height", Math.abs(height))
                }
                
            })

            svg.on("mouseup.drag", function(d){
                if(that.dragble.flag = true){
                    that.dragble.flag = false
                    that.dragble.endLoc = [d3.event.layerX, d3.event.layerY]
                    rect.attr("width", 0).attr("height", 0)

                    that.blueLines.forEach((d,i) => {
                        let ep = d.getEndPoints(),
                            widthRange = [that.dragble.startLoc[0], that.dragble.endLoc[0]].sort(),
                            heightRange = [that.dragble.startLoc[1], that.dragble.endLoc[1]].sort()
                        if(( widthRange[0] < ep.sourceX && ep.sourceX < widthRange[1] && heightRange[0] < ep.sourceY && ep.sourceY < heightRange[1]) || 
                            (widthRange[0] < ep.targetX && ep.targetX < widthRange[1] && heightRange[0] < ep.targetY && ep.targetY < heightRange[1])){
                                console.log("in")
                                d.highLight()
                                d.toDelete()
                            }
                    })
                }
                
            })
        },
        deleteLine(){
            let that = this,
                lineLines = this.blueLines.length
            for(let i=0; i<lineLines; i++){
                console.log(this.blueLines[i].getdeleteStatu())
                if(this.blueLines[i].getdeleteStatu() == true){
                    that.blueLines[i].remove()
                    this.bluelines.split(i, 1)
                    lineLines = lineLines - 1
                }
            }
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
                console.log(that.container)
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
                let coverType = com.getType(),
                        coverColor = that.lineColor[coverType],
                        params = com.getParmas(),
                        x = d.parentX + d.x,
                        y = d.parentY + d.y,
                        sourceid = params.id,
                        nowColor = that.mouseActionType.color;
                coverColor = nowColor

                let line = (that.drawingLine = new BlueprintLine(
                    that.container,
                    params.name,
                    [x, y],
                    d,
                    sourceid,
                    coverColor,
                    that.mouseActionType.index
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

           let _name = arguments[0]
            constructproperty(that, that.modelConfig[_name], _name)
        },
        buildBlueGraph(con){
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
                //1 connection
                //2 filter
                that.componentGraph[indexsource][indextarget] = that.mouseActionType.index
            }
        },
        catchConnect(option){
            // catch ConnectInfo
            let that = this
            let interval = function(con){
                let i = 0;
                let intr = setInterval(function() {
                let conInfo = con.getConnectInfo()
                if (conInfo.targetId != ""){
                    clearInterval(intr);
                    that.buildBlueGraph(con)
                }
                }, 500)
            }
            let emptyItems = function(){
                that.chartLayout = {}
                that.chartLayoutObj = {}
                that.blueComponentNameList = []
                that.vegaObjectObj = {}
                that.chartData = {}
            }
            let removeDeltedLine = function(){
                let savedLine = []
                that.blueLines.forEach(function(d,i){
                if(d.getConnectInfo().isDeleted == false){
                    savedLine.push(d)
                }
                })
                that.blueLines = savedLine
            }
            if(option == "add"){
                let tailNo = that.blueLines.length - 1;
                interval(that.blueLines[tailNo])
            }else if(option == "delete"){
                //delete removed blueprint line
                that.blueLinesDelSignal = true
                removeDeltedLine()
            }else if(option == "afterdelete"){
                //empty the bluegraph map
                //buildBlueGraph
                emptyItems()
                that.blueLines.forEach(function(d,i){
                interval(d)
                })
            }else if(option == "empty"){
                //empty the bluegraph map
                emptyItems()
            }
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
        changeMouseActionType(type){
            let content = {
                "Connection": {
                    "text": 'Attribute Mapping',
                    "color": "#838DFF",
                    "index": 1
                },
                "Filter": {
                    "text": "Filter Condition",
                    "color": "#70B34D",
                    "index": 2
                },
                "Highlight": {
                    "text": "Highlight Condition",
                    "color": "#FFB429",
                    "index": 3
                },
                "Refresh": {
                    "text": "Refresh editor",
                    "color": "#B81D17",
                    "index": -1
                }
            }
            this.mouseActionType = JSON.parse(JSON.stringify(content[type]))
            this.h5Style.background = content[type].color;
        },
        highlightHandler(){},
        refresh(){
            let that = this
            let cleanAttribution = function(){
                for(let key in that.controlComponentCount){
                    that.controlComponentCount[key] = 0
                }
                for(let key in that.comChartCount){
                    that.comChartCount[key] = 0
                }
                for(let key in that.blueComponentsTypeCount){
                    that.blueComponentsTypeCount[key] = 0
                }
                that.dataComponent = {}
                that.blueComponents = []
                that.selectedData = {}
                that.loadedDatasets = {}
                that.blueLines = []
                that.exstingPorts = []
                that.blueLinesDelSignal = false
                that.chartLayout = {}
                that.chartLayoutObj = {}
                that.blueComponentNameList = []
                that.componentGraph = []
                that.chartData = {}
                that.dataMapper = {}
                that.lastBlueLines = []
                that.blueLinesName = []
            }
            cleanAttribution()
            //add components
            d3.selectAll('.blueComponent').remove()
            d3.selectAll('.blueLine').remove()
            this._components.forEach(d => {
                that.addComponent(d)
            })
            that.changeMouseActionType("Refresh")
            window.setTimeout(function(){
                that.changeMouseActionType('Connection')
            },500);
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
        setInterval(function(){
            if(that.blueLines.length){
            let templength = that.blueLines.length;
            for(let i=0; i<templength; i++){
                if(that.blueLines[i].getConnectInfo().isDeleted == "true"){
                    that.blueLines.splice(i,1)
                    templength = templength - 1
                    console.log(true)
                    }
                }
            }
        }, 1500)
    }
}
</script>
<style>
.el-header {
    text-align: center;
}
.buttonInner {
    display: inline-block;
}
.el-main{
    padding: 5px !important
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.el-button--text{
    color: grey !important
}
.el-divider__text{
    font-weight: 700;
    font-size: 16px;
}
</style>
