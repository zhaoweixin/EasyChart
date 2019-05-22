<template>
    <div id="bubblechart"></div>
</template>
<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from '@antv/g2';
//import {mapMutations} from vuex;
export default {
    name: 'bubbleChart',
    data() {
        return {
        name: 'bubbleChart',
        sourceData: [{
            item: '高血压',
            group: 1,
            value: 34,
            ratio: 100
            },  {
            item: '高血压',
            group: 2,
            value: 50,
            ratio: 100
            }, {
            item: '高血压',
            group: 3,
            value: 40,
            ratio: 100
            },  {
            item: '高血压',
            group: 4,
            value: 20,
            ratio: 100
            }, {
            item: '高血压',
            group: 5,
            value: 70,
            ratio: 100
            }, {
            item: '高血压',
            group: 6,
            value: 55,
            ratio: 100
            }, {
            item: '高血压',
            group: 7,
            value: 55,
            ratio: 100
            }, {
            item: '高血压',
            group: 8,
            value: 55,
            ratio: 100
            }, {
            item: '高血压',
            group: 9,
            value: 55,
            ratio: 100
            }, {
            item: '高血压',
            group: 10,
            value: 55,
            ratio: 40
            }],

        bubblechartSet: {
            "id": "001",
            "category": "bubblechart", //种类
            "container": {  //布局
            "height": "100",
            "width": "100",
            "padding": [0,0,0,0]
            },
            "meta": {
            "title":"bubblechart",
            "legend":false, //图示
            "tooltip": "", //提示
            "X_axis": {},
            "Y_axis": {},
            "value": {
                "size": [],
                "color": "red",
                "label": {},
                "opacity": "0.3",
                "shape": "circle",
                "style": {},
            },
            },
            "data":[],
            "interaction": {

            }
        },
        container: [],
        chartCount: 0
        }
    },
    computed: {
        toDrawChart(){
            console.log(this.$store.state.toDrawChart)
            return this.$store.state.toDrawChart
        },
        getChartXY(){
            return this.$store.getters.getChartXY
        },
        chartLayer(){
            return this.$store.state.chartLayer
        }
    },
    watch:{
        toDrawChart: function(curVal, oldVal){
            console.log(this.toDrawChart, this.getChartXY, this.chartLayer)
            console.log(curVal, oldVal)
            if(curVal != oldVal && curVal == "bubbleChart"){
                console.log(this.toDrawChart, this.getChartXY, this.chartLayer)
                this.initTest()
            }
        }
    },
    methods: {
        initTest() {
        const that = this
        let divId = this.getContainer()

        this.chart = new G2.Chart({
            container: divId,
            height: 350,
            width: 600,
            padding: [50, 20, 50, 80],
        });

        this.chart.source(this.sourceData, {
            group: {
                tickInterval: 1, // 自定义刻度间距
                nice: false, // 不对最大最小值优化
            
            },
            ratio: {
                tickInterval: 20,
                nice: false,
                max: 100,
                min: 0
            }
        });
        // 开始配置坐标轴
        this.chart.axis('group', {
            label: {
                formatter: function formatter(val) {
                return val + ' 组'; // 格式化坐标轴显示文本
                },
                textStyle: {
                fontSize: 12, 
                textAlign: 'center', 
                fill: '#ccc', 
                }
            },
            grid: {
                lineStyle: {
                stroke: '#d9d9d9',
                lineWidth: 1,
                lineDash: [2, 2]
                }
            }
        });
        this.chart.axis('ratio', {
            title: {
                offset: 64
            },
            label: {
                formatter: function formatter(val) {
                if (val > 0) {
                    return val + ' %';
                }
                },
                textStyle: {
                fontSize: 12, 
                fill: '#ccc', 
                }
            }
        });
        this.chart.legend(false);
        this.chart.tooltip({
            title: 'country'
        });
        this.chart.point().position('group*ratio')
            .size('value', [8, 25])
            .label('value', {
                offset: 0, // 文本距离图形的距离
                textStyle: {
                    fill:'white'
                    }
                })
            .opacity(0.3)
            .shape('circle')
            .tooltip('group*value')
            .style({
                lineWidth: 1,
                stroke: '#1890ff'
            });
        this.chart.render();
        //this.$store.state.chartComponetArray.push(bubbleChart);
        },
        getContainer(){
            let that = this
            let divId = this.name + "-" + this.chartCount;
            this.container.push(divId)
            this.chartCount++;
            let div = document.createElement("div")
            div.setAttribute("id", divId)
            div.setAttribute("style", "position: absolute")
            div.style.postion = "absolute"
            document.getElementById(that.chartLayer).appendChild(div);
            return divId
        },
        getDataWithURL() {
            var api = '';
            
            this.$http.get(api).then((response)=>{
                console.log(response);
            },function(err){
                console.log(err);
            })
        }

    },
    mounted() {
        //this.initTest();
    }
}
</script>

    