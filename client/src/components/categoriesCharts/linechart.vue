<template>
      <div v-bind:id='contain'>
    </div> 
      
</template>
<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from "@antv/g2";
import { mapState } from 'vuex';
import $ from "jquery";
export default {
  name: "lineChart",
  data() {
    return {
      isInit:false,
      name: "lineChart",
      chart:{},
      sourceData: [{
        year: '1991',
        value: 3
      }, {
        year: '1992',
        value: 4
      }, {
        year: '1993',
        value: 3.5
      }, {
        year: '1994',
        value: 5
      }, {
        year: '1995',
        value: 4.9
      }, {
        year: '1996',
        value: 6
      }, {
        year: '1997',
        value: 7
      }, {
        year: '1998',
        value: 9
      }, {
        year: '1999',
        value: 13
      }],

      bubblechartSet: {
        id: "001",
        category: "linechart", //种类
        container: {
          //布局
          height: '150',
          width: '300',
          padding: [30, 30, 30, 30],
          background: {
            fill: "#feeeed", //背景颜色 (给定数组)
            fillOpacity: '0.5', // 图表背景透明度
            stroke: "#7fb80e", // 图表边框颜色 (给定数组)
            strokeOpacity: '0.8', // 图表边框透明度
            opacity: '0.6', // 图表整体透明度
            lineWidth: '2', // 图表边框粗度
            radius: '15' // 图表圆角大小
          }
        },
        meta: {
          title: "linechart",
          legend: 'false', //图示
          tooltip: {
            //提示
            triggerOn: "mousemove", //触发方式'mousemove'、'click'、'none'
            title: "country", //提示标题
            crosshairs: {}, //辅助线和辅助框(暂时先不加)
            offset: 0, //设置 tooltip 距离鼠标的偏移量。
            inPlot: 'true', //设置是否将 tooltip 限定在绘图区域内，默认为 true，即限定在绘图区域内。
            follow: 'true', //设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。
            shared: 'true', //设置 tooltip 只展示单条数据。
            enterable: 'true', //用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。
            position: "top", //该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：left、right、top、bottom。
            hideMarkers: 'true' //对于 line、area、path 这三种几何图形，我们在渲染 tooltip 时会自动渲染 tooltipMarker ，通过声明该属性值为 true 来关闭 tooltipMarker。
          },
          X_axis: {
            //x轴
            name: "group",
            position: "bottom", //设置坐标轴位置
            line: {
              //设置坐标轴样式
              stroke: "#c63c26", // 坐标轴线的颜色
              strokeOpacity: '0.8', // 坐标轴线的透明度，数值范围为 0 - 1
              lineDash: [3, 4], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
              lineWidth: '2' // 设置坐标轴线的粗细
            },
            label: {
              text: "组",
              textStyle: {
                textAlign: "center", // 文本对齐方向，可取值为： start center end
                fill: "#404040", // 文本的颜色
                fontSize: '12', // 文本大小
                fontWeight: "bold", // 文本粗细
                textBaseline: "top" // 文本基准线，可取 top middle bottom，默认为middle
              }
            }
          },
          Y_axis: {
            //y轴
            name: "ratio",
            label: {
              text: "组",
              textFontSize: '12',
              fill: "#ccc"
            }
          },
          value: {
            //数据标记
            size: [],
            color: "red",
            label: {},
            opacity: '0.3',
            shape: "circle",
            style: {}
          }
        },
        data: [],
        interaction: {}
      },
      container: [],
      chartCount: 0
    };
  },
  props: {
    'contain':String
  },
  computed: {
    // toDrawChart() {
    //   return this.$store.state.toDrawChart;
    // },
    getChartXY() {
      return this.$store.getters.getChartXY;
    },
    chartLayer() {
      return this.$store.state.chartLayer;
    },
    boxStyle: function() {
      return {
        width: this.localw + 'px',
        height: this.localh + 'px',
        transform: 'translate(' + this.localx + 'px,' + this.localy + 'px) '
      }
    },
    ...mapState({
      chartArray: state => state.chartIdArray,
      refreshData: state => state.chartChange,
    })
  },
  // watch: {
  //   // toDrawChart: function(curVal, oldVal) {
  //   //   console.log(this.toDrawChart, this.getChartXY, this.chartLayer);
  //   //   console.log(curVal, oldVal);
  //   //   if (curVal != oldVal && curVal == "bubbleChart") {
  //   //     // console.log(this.toDrawChart, this.getChartXY, this.chartLayer);
  //   //     // console.log("监听toDrawChart");
  //   //     this.initTest();
  //   //   }
  //   // },
  //   'chartArray': {
  //     deep: true,
  //     handler() {
  //       if (this.isInit) {
  //         this.chart = null;
  //         //this.chart.destroy();
  //         console.log("zhixingle")
  //       }
  //       this.initTest(this.bubblechartSet);
  //       this.isInit = !this.isInit
  //       // console.log("x:"+this.$store.state.chartX);
  //       // console.log("y:"+this.$store.state.chartY);
  //     }
  //   },
  //   'refreshData': {
  //     deep: true,
  //     handler() {
  //       if (this.$store.state.chartChange == "bubble") {
  //         console.log("收到数据更改了");
  //         this.chart.destroy();
  //         this.initTest(this.$store.state.chartComponentArray[0]);
  //       }
  //     }
  //   }
  // },
  mounted() {
    this.initTest();
    //this.chartInit();
  },
  methods: {
    initTest() {
      //const that = this;
      //console.log(this.bubblechartSet.meta.X_axis.label.text);
      this.chart = new G2.Chart({
        container: this.contain,
        height: parseInt(this.bubblechartSet.container.height),
        width: parseInt(this.bubblechartSet.container.width),
        padding: this.bubblechartSet.container.padding,
        background: {
          fill: this.bubblechartSet.container.background.fill, //背景颜色 (给定数组)
          fillOpacity: parseFloat(this.bubblechartSet.container.background.fillOpacity), // 图表背景透明度
          stroke: this.bubblechartSet.container.background.stroke, // 图表边框颜色 (给定数组)
          strokeOpacity: parseFloat(this.bubblechartSet.container.background.strokeOpacity), // 图表边框透明度
          opacity: parseFloat(this.bubblechartSet.container.background.opacity), // 图表整体透明度
          lineWidth: parseFloat(this.bubblechartSet.container.background.lineWidth), // 图表边框粗度
          radius: parseFloat(this.bubblechartSet.container.background.radius) // 图表圆角大小
        },
        data: this.sourceData
      });
      this.chart.scale({
        group: {
          tickInterval: 1, // 自定义刻度间距
          nice: false // 不对最大最小值优化
        },
        ratio: {
          tickInterval: 20,
          nice: false,
          max: 100,
          min: 0
        }
      });
      // 开始配置坐标轴
      this.chart.axis(this.bubblechartSet.meta.X_axis.name, {
        position: this.bubblechartSet.meta.X_axis.postion, //设置横坐标位置
        line: {
          stroke: this.bubblechartSet.meta.X_axis.line.stroke, // 坐标轴线的颜色
          strokeOpacity: this.bubblechartSet.meta.X_axis.line.strokeOpacity, // 坐标轴线的透明度，数值范围为 0 - 1
          //lineDash: [3,4,4,7], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
          lineWidth: this.bubblechartSet.meta.X_axis.line.lineWidth // 设置坐标轴线的粗细
        },
        label: {
          formatter: function formatter(val) {
            //var labeltext = this.bubblechartSet.meta.X_axis.label.text;
            return val + '组'; // 格式化坐标轴显示文本
          },
          textStyle: {
            fontSize: parseInt(this.bubblechartSet.meta.X_axis.label.textStyle.fontSize),
            textAlign: this.bubblechartSet.meta.X_axis.label.textStyle.textAlign,
            fill: this.bubblechartSet.meta.X_axis.label.textStyle.fill,
          }
        },
        tickLine: {
          // 坐标轴刻度线
          lineWidth: 1, // 刻度线宽
          stroke: "#ccc", // 刻度线的颜色
          strokeOpacity: 0.5, // 刻度线颜色的透明度
          length: 5, // 刻度线的长度，可以为负值（表示反方向渲染）
          alignWithLabel: true //设为负值则显示为category数据类型特有的样式
        },
        grid: {
          //设置网格线的样式
          lineStyle: {
            stroke: "#d9d9d9",
            lineWidth: 1,
            lineDash: [2, 2]
          }
        }
      });
      this.chart.axis("ratio", {
        title: {
          offset: 64
        },
        label: {
          formatter: function formatter(val) {
            if (val > 0) {
              return val + " %";
            }
          },
          textStyle: {
            fontSize: 12,
            fill: "#ccc"
          }
        }
      });
      this.chart.legend(false);
      this.chart.tooltip({
        //triggerOn: this.bubblechartSet.meta.tooltip.triggerOn,
        triggerOn: 'click',
        title: this.bubblechartSet.meta.tooltip.title,
      });
      this.chart
        .point()
        .position(this.bubblechartSet.meta.X_axis.name + "*" + this.bubblechartSet.meta.Y_axis.name)
        .size("value", [5, 20])
        .label("value", {
          offset: 0, // 文本距离图形的距离
          textStyle: {
            fill: "white"
          }
        })
        .opacity(parseFloat(this.bubblechartSet.meta.value.opacity))
        .shape(this.bubblechartSet.meta.value.shape)
        .tooltip("group*value")
        .style({
          lineWidth: 1,
          stroke: "#1890ff"
        });
      this.chart.render();
      console.log("生成了一个bubbleChart");
      console.log()
      // this.$store.commit("pushDataSetToState", {
      //   dataset: $.extend(true,{},val)
      // });
      // console.log("state中的宽"+this.$store.state.chartComponentArray[0].container.width);
      // console.log("state中的高"+this.$store.state.chartComponentArray[0].container.height);
      // console.log("bub中的宽"+this.bubblechartSet.container.width);
      // console.log("bub中的宽"+this.bubblechartSet.container.height);
    },

  }
  
};
</script>






    