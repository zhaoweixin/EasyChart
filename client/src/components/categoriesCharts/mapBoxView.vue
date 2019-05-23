<template>
    <div id="mapBoxView"></div>
</template>
<script>
    import G2 from '@antv/g2'
export default {
    data() {
        return {
        sourceData: [{
            name: 'Russia',
            value: 86.8
            }, {
            name: 'China',
            value: 106.3
            }, {
            name: 'Japan',
            value: 94.7
            }, {
            name: 'Mongolia',
            value: 98
            }, {
            name: 'Canada',
            value: 98.4
            }, {
            name: 'United Kingdom',
            value: 97.2
            }, {
            name: 'United States of America',
            value: 98.3
            }, {
            name: 'Brazil',
            value: 96.7
            }, {
            name: 'Argentina',
            value: 95.8
            }, {
            name: 'Algeria',
            value: 101.3
            }, {
            name: 'France',
            value: 94.8
            }, {
            name: 'Germany',
            value: 96.6
            }, {
            name: 'Ukraine',
            value: 86.3
            }, {
            name: 'Egypt',
            value: 102.1
            }, {
            name: 'South Africa',
            value: 101.3
            }, {
            name: 'India',
            value: 107.6
            }, {
            name: 'Australia',
            value: 99.9
            }, {
            name: 'Saudi Arabia',
            value: 130.1
            }, {
            name: 'Afghanistan',
            value: 106.5
            }, {
            name: 'Kazakhstan',
            value: 93.4
            }, {
            name: 'Indonesia',
            value: 101.4
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

    },
    methods: {
        initChart(sourceData,bubblechart) {
            //--------基础设置----------------
            var id = bubblechart.id;
            var chart = new G2.chart({
                container: 'mapBoxView',
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
            var chart = new G2.Chart({
            container: 'mountNode',
            forceFit: true,
            height: window.innerHeight,
            padding: [55, 20]
            });
            chart.tooltip({
            showTitle: false
            });
            // 同步度量
            chart.scale({
            longitude: {
                sync: true
            },
            latitude: {
                sync: true
            }
            });
            chart.axis(false);
            chart.legend('trend', {
            position: 'left'
            });

            // 绘制世界地图背景
            var ds = new DataSet();
            var worldMap = ds.createView('back').source(mapData, {
            type: 'GeoJSON'
            });
            var worldMapView = chart.view();
            worldMapView.source(worldMap);
            worldMapView.tooltip(false);
            worldMapView.polygon().position('longitude*latitude').style({
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1
            });

            // 可视化用户数据
            var userDv = ds.createView().source(this.sourceData).transform({
            geoDataView: worldMap,
            field: 'name',
            type: 'geo.region',
            as: ['longitude', 'latitude']
            }).transform({
            type: 'map',
            callback: function callback(obj) {
                obj.trend = obj.value > 100 ? '男性更多' : '女性更多';
                return obj;
            }
            });
            var userView = chart.view();
            userView.source(userDv, {
            'trend': {
                alias: '每100位女性对应的男性数量'
            }
            });
            userView.polygon().position('longitude*latitude').color('trend', ['#F51D27', '#0A61D7']).opacity('value').tooltip('name*trend').animate({
            leave: {
                animation: 'fadeOut'
            }
            });
            chart.render();
        },
        getDataWithURL() {

        }

    },
    mounted() {

    }
}
</script>