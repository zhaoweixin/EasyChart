<template>
    <div id="groupPieChart"></div>
</template>
<script>
    import G2 from '@antv/g2'
export default {
    data() {
        return {
        sourceData: [{
            value: 251,
            type: '大事例一',
            name: '子事例一'
        }, {
            value: 1048,
            type: '大事例一',
            name: '子事例二'
        }, {
            value: 610,
            type: '大事例二',
            name: '子事例三'
        }, {
            value: 434,
            type: '大事例二',
            name: '子事例四'
        }, {
            value: 335,
            type: '大事例三',
            name: '子事例五'
        }, {
            value: 250,
            type: '大事例三',
            name: '子事例六'
        }],
        //this.$store.data,

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
        initChart(sourceData,bubblechart) {
            //--------基础设置----------------
            var id = bubblechart.id;
            var chart = new G2.chart({
                container: 'groupPieChart',
                height: bubblechart.container.height,
                width: bubblechart.container.width,
                forceFit: false,//大小自适应
                padding: bubblechart.container.padding,
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
            var dv = new DataView();
            dv.source(this.sourceData).transform({
                type: 'percent',
                field: 'value',
                dimension: 'type',
                as: 'percent'
            });
            var chart = new G2.Chart({
                container: 'mountNode',
                forceFit: true,
                height: window.innerHeight,
                padding: 0
            });
            chart.source(dv, {
                percent: {
                formatter: function formatter(val) {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
                }
            });
            chart.coord('theta', {
                radius: 0.5
            });
            chart.tooltip({
                showTitle: false
            });
            chart.legend(false);
            chart.intervalStack().position('percent').color('type').label('type', {
                offset: -10
            }).tooltip('name*percent', function(item, percent) {
                percent = (percent * 100).toFixed(2) + '%';
                return {
                name: item,
                value: percent
                };
            }).select(false).style({
                lineWidth: 1,
                stroke: '#fff'
            });

            var outterView = chart.view();
            var dv1 = new DataView();
            dv1.source(data).transform({
                type: 'percent',
                field: 'value',
                dimension: 'name',
                as: 'percent'
            });
            outterView.source(dv1, {
                percent: {
                formatter: function formatter(val) {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
                }
            });
            outterView.coord('theta', {
                innerRadius: 0.5 / 0.75,
                radius: 0.75
            });
            outterView.intervalStack().position('percent').color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']).label('name').tooltip('name*percent', function(item, percent) {
                percent = (percent * 100).toFixed(2) + '%';
                return {
                name: item,
                value: percent
                };
            }).select(false).style({
                lineWidth: 1,
                stroke: '#fff'
            });

            chart.render();
        }

    }
}
</script>