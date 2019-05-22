<template>
    <div id="lineChart"></div>
</template>
<script>
import G2 from '@antv/g2'
export default {
    data() {
        return {
        name: 'linechart',
        sourceData: [{
            type: '家具家电',
            value: 34000
        }, {
            type: '粮油副食',
            value: 25000
        }, {
            type: '生鲜水果',
            value: 11000
        }, {
            type: '美容洗护',
            value: 9000
        }, {
            type: '母婴用品',
            value: 7000
        }, {
            type: '进口食品',
            value: 6000
        }, {
            type: '食品饮料',
            value: 4800
        }, {
            type: '家庭清洁',
            value: 500
        }],
        //this.$store.data,


        //demo
        bubblechart: {
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
        }
        }
    },
    computed: {
        toDrawChart() {
            return this.$store.toDrawChart;
        },
        getChartXY(){
            return this.$store.getters.getChartXY;
        },
        chartLayer() {
            return this.$store.state.chartLayer;
        }
    },
    watch: {
        toDrawChart: function(curVal, oldVal){
            console.log(this.toDrawChart, this.getChartXY, this.chartLayer)
            console.log(curVal, oldVal)
            if(curVal != oldVal && curVal == "lineChart"){
                console.log(this.toDrawChart, this.getChartXY, this.chartLayer)
                this.initChart()
            }
        }
    },
    methods: {
        initChart(sourceData,bubblechart) {
            // //--------基础设置----------------
            // var id = bubblechart.id;
            // var chart = new G2.chart({
            //     container: 'ineChart',
            //     height: bubblechart.container.height,
            //     width: bubblechart.container.width,
            //     forceFit: false,//大小自适应
            //     padding: bubblechart.container.padding,
            // });
            // chart.animate(false); //设置动画
            // //-----------高级设置---------------
            // chart.source(this.sourceData, {
            //     group: {
            //         tickInterval:1,
            //         nice:false,
            //     },
            //     ratio: {
            //         tickInterval:100,
            //         nice:false,
            //         max:100,
            //         min:0
            //     }
            // });
            // chart.scale('x',{
            //     type: 'linear',   //度量的类型
            //     range: [],  //数值范围区间，度量准换范围
            //     alias: '', //为数据属性定义别名
            //     ticks: [], //存储坐标轴上的刻度点文本信息
            //     tickCount: 5, //坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
            //     // formatter: function () { // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
                    
            //     // },
            //     /**linear */
            //     nice: true, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
            //     min: 0, // 定义数值范围的最小值
            //     max: 100, // 定义数值范围的最大值
            //     minLimit: 0, // 对数据的最小值的限制，无论数据中是否存在比这个值小的数据，生成的坐标点不会小于这个值
            //     maxLimit: 100, // 对数据的最大值的限制，无论数据中是否存在比这个值大的数据，生成的坐标点不会大于这个值
            //     tickCount: 5, // 定义坐标轴刻度线的条数，默认为 5
            //     //tickInterval: {number}, // 用于指定坐标轴各个刻度点的间距，为原始数据值的差值，tickCount 和 tickInterval 不可以同时声明
            //     /** log */
            //     base: 2,
            //     /** pow */
            //     exponent: 2, // 指数，默认是 2
            //     /** time */
            //     mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'
            //     /** cat */
            //     values: [], // 指定当前字段的分类值
            //     /** timeCat */
            //     mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'

            // });
            // chart.scale('y',{
            //     type: 'linear',   //度量的类型
            //     range: [],  //数值范围区间，度量准换范围
            //     alias: '', //为数据属性定义别名
            //     ticks: [], //存储坐标轴上的刻度点文本信息
            //     tickCount: 5, //坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
            //     // formatter: function () { // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
                    
            //     // },
            //     // /**linear */
            //     // nice: {boolean}, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
            //     // min: 0, // 定义数值范围的最小值
            //     // max: 100, // 定义数值范围的最大值
            //     // minLimit: 0, // 对数据的最小值的限制，无论数据中是否存在比这个值小的数据，生成的坐标点不会小于这个值
            //     // maxLimit: 100, // 对数据的最大值的限制，无论数据中是否存在比这个值大的数据，生成的坐标点不会大于这个值
            //     // tickCount: 5, // 定义坐标轴刻度线的条数，默认为 5
            //     // //tickInterval: {number}, // 用于指定坐标轴各个刻度点的间距，为原始数据值的差值，tickCount 和 tickInterval 不可以同时声明
            //     // /** log */
            //     // base: 2,
            //     // /** pow */
            //     // exponent: 2, // 指数，默认是 2
            //     // /** time */
            //     // mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'
            //     // /** cat */
            //     // values: [], // 指定当前字段的分类值
            //     // /** timeCat */
            //     // mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'
            // });
            // const geom = chart.point(); //设置坐标几何point，path，line，area，interval，polygon，edge，schema，heatmap
            // chart.legend(); //设置图例
            // chart.tooltip();//设置提示信息
            // chart.guide(); //设置辅助元素
            // chart.render(); //生成图像

        },
        initTest() {
            const that = this
            let divId = this.getContainer()
            var chart = new G2.Chart({
                container: 'lineChart',
                forceFit: 350,
                height: 600,
                padding: [20, 20, 30, 90]
            });
            chart.source(this.sourceData, {
                value: {
                    tickCount: 5
                }
            });
            chart.scale('value', {
                alias: '销售额(万)'
            });
            chart.axis('type', {
            label: {
                textStyle: {
                    fill: '#aaaaaa'
                }
            },
            tickLine: {
                alignWithLabel: false,
                length: 0
            }
            });
            chart.axis('value', {
                label: {
                textStyle: {
                    fill: '#aaaaaa'
                },
                formatter: function formatter(text) {
                    return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                }
                },
                title: {
                offset: 70
                }
            });
            chart.tooltip({
                share: true
            });
            chart.guide().dataMarker({
                top: true,
                content: '因政策调整导致销量下滑',
                position: ['2014-01', 1750],
                style: {
                text: {
                    fontSize: 13
                }
                },
                lineLength: 30
            });
            chart.interval().position('type*value').opacity(1);
            chart.render();
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