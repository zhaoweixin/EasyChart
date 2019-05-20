<template>
    <div id="bubblechart"></div>
</template>
<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from '@antv/g2';
//import {mapMutations} from vuex;
export default {
    name: 'bubble',
    data() {
        return {
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
        //this.$store.data,

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
        }
        }
    },
    computed: {

    },
    methods: {
        // ...mapMutations([
        //     'createChartComponet'
        // ]),
        createChartComponet() {
            var bubbleChart = initChart(data,bubbleChartSet);
            this.$store.state.chartComponetArray.push(bubbleChart);
        },
        initChart() {
            //--------基础设置----------------
            var id = bubblechart.id;
            var chart = new G2.chart({
                container: 'bubblechart',
                height: 100,
                width: 100,
                forceFit: false,//大小自适应
                padding: [0,0,0,0],
            });
            chart.animate(false); //设置动画
            //-----------高级设置---------------
            chart.source(sourceData, {
                group: {
                    tickInterval:1,
                    nice:false,
                },
                ratio: {
                    tickInterval:100,
                    nice:false,
                    max:100,
                    min:0
                }
            });
            chart.scale('x',{
                type: 'linear',   //度量的类型
                range: [],  //数值范围区间，度量准换范围
                alias: '', //为数据属性定义别名
                ticks: [], //存储坐标轴上的刻度点文本信息
                tickCount: 5, //坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
                // formatter: function () { // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
                    
                // },
                /**linear */
                nice: true, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
                min: 0, // 定义数值范围的最小值
                max: 100, // 定义数值范围的最大值
                minLimit: 0, // 对数据的最小值的限制，无论数据中是否存在比这个值小的数据，生成的坐标点不会小于这个值
                maxLimit: 100, // 对数据的最大值的限制，无论数据中是否存在比这个值大的数据，生成的坐标点不会大于这个值
                tickCount: 5, // 定义坐标轴刻度线的条数，默认为 5
                //tickInterval: {number}, // 用于指定坐标轴各个刻度点的间距，为原始数据值的差值，tickCount 和 tickInterval 不可以同时声明
                /** log */
                base: 2,
                /** pow */
                exponent: 2, // 指数，默认是 2
                /** time */
                mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'
                /** cat */
                values: [], // 指定当前字段的分类值
                /** timeCat */
                mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'

            });
            chart.scale('y',{
                type: 'linear',   //度量的类型
                range: [],  //数值范围区间，度量准换范围
                alias: '', //为数据属性定义别名
                ticks: [], //存储坐标轴上的刻度点文本信息
                tickCount: 5, //坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
                // formatter: function () { // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
                    
                // },
                // /**linear */
                // nice: {boolean}, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
                // min: 0, // 定义数值范围的最小值
                // max: 100, // 定义数值范围的最大值
                // minLimit: 0, // 对数据的最小值的限制，无论数据中是否存在比这个值小的数据，生成的坐标点不会小于这个值
                // maxLimit: 100, // 对数据的最大值的限制，无论数据中是否存在比这个值大的数据，生成的坐标点不会大于这个值
                // tickCount: 5, // 定义坐标轴刻度线的条数，默认为 5
                // //tickInterval: {number}, // 用于指定坐标轴各个刻度点的间距，为原始数据值的差值，tickCount 和 tickInterval 不可以同时声明
                // /** log */
                // base: 2,
                // /** pow */
                // exponent: 2, // 指数，默认是 2
                // /** time */
                // mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'
                // /** cat */
                // values: [], // 指定当前字段的分类值
                // /** timeCat */
                // mask: 'YYYY-MM-DD', // 指定时间的显示格式，默认：'YYYY-MM-DD'
            });
            const geom = chart.point(); //设置坐标几何point，path，line，area，interval，polygon，edge，schema，heatmap
            chart.legend(); //设置图例
            chart.tooltip();//设置提示信息
            chart.guide(); //设置辅助元素
            chart.render(); //生成图像
        },
        initTest() {
           var sourceData= [{
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
            }];
        this.chart = new G2.Chart({
        container: 'bubblechart',
        height: 350,
        width: 600,
        padding: [50, 20, 50, 80],
        });

        this.chart.source(sourceData, {
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
        }).opacity(0.3).shape('circle').tooltip('group*value').style({
        lineWidth: 1,
        stroke: '#1890ff'
        });

        this.chart.render();
        }

    },
    // mounted: {
    //     createChart() {
    //         initChart(sourceData,bubblechartSet)
    //     }
    // }
}
</script>

    