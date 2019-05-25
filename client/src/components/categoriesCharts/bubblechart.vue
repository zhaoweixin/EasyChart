<template>
  <div class="layout">
    <div class="dragable" @mousedown="handleDown" @mouseup="handleUp" :style="boxStyle">
      <slot></slot>
      <div id="bubblechart"></div>
      <div class="scale" @mousedown.stop="resizeStart"></div>
    </div>
  </div>
</template>
<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from "@antv/g2";
//import {mapMutations} from vuex;
export default {
  name: "bubbleChart",
  props: {
    w: {
      type: Number,
      default: 200
    },
    h: {
      type: Number,
      default: 200
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    r: {
      type: Number,
      default: 0
    },
    axis: {
      type: String,
      default: 'both'
    },
    handle: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    },
    grid: {
      type: Array,
      default: function() {
        return [0, 0]
      }
    },
  },
  data() {
    return {
      name: "bubbleChart",
      localx: this.x,
      localy: this.y,
      localw: this.w,
      localh: this.h,
      localr: this.r,
      lastX: 0,
      lastY: 0,
      dragging: false,
      resizeStartX: 0,
      resizeStartY: 0,
      resizing: false,
      sourceData: [
        {
          item: "高血压",
          group: 1,
          value: 34,
          ratio: 100
        },
        {
          item: "高血压",
          group: 2,
          value: 50,
          ratio: 100
        },
        {
          item: "高血压",
          group: 3,
          value: 40,
          ratio: 100
        },
        {
          item: "高血压",
          group: 4,
          value: 20,
          ratio: 100
        },
        {
          item: "高血压",
          group: 5,
          value: 70,
          ratio: 100
        },
        {
          item: "高血压",
          group: 6,
          value: 55,
          ratio: 100
        },
        {
          item: "高血压",
          group: 7,
          value: 55,
          ratio: 100
        },
        {
          item: "高血压",
          group: 8,
          value: 55,
          ratio: 100
        },
        {
          item: "高血压",
          group: 9,
          value: 55,
          ratio: 100
        },
        {
          item: "高血压",
          group: 10,
          value: 55,
          ratio: 40
        }
      ],

      bubblechartSet: {
        id: "001",
        category: "bubblechart", //种类
        container: {
          //布局
          height: "100",
          width: "100",
          padding: [0, 0, 0, 0],
          backgournd: {
            fill: "#feeeed", //背景颜色 (给定数组)
            fillOpacity: 0.5, // 图表背景透明度
            stroke: "#7fb80e", // 图表边框颜色 (给定数组)
            strokeOpacity: 0.8, // 图表边框透明度
            opacity: 0.6, // 图表整体透明度
            lineWidth: 2, // 图表边框粗度
            radius: 15 // 图表圆角大小
          }
        },
        meta: {
          title: "bubblechart",
          legend: false, //图示
          tooltip: {
            //提示
            triggerOn: "click", //触发方式'mousemove'、'click'、'none'
            title: "country", //提示标题
            crosshairs: {}, //辅助线和辅助框(暂时先不加)
            offset: 0, //设置 tooltip 距离鼠标的偏移量。
            inPlot: true, //设置是否将 tooltip 限定在绘图区域内，默认为 true，即限定在绘图区域内。
            follow: true, //设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。
            shared: true, //设置 tooltip 只展示单条数据。
            enterable: true, //用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。
            position: "top", //该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：left、right、top、bottom。
            hideMarkers: true //对于 line、area、path 这三种几何图形，我们在渲染 tooltip 时会自动渲染 tooltipMarker ，通过声明该属性值为 true 来关闭 tooltipMarker。
          },
          X_axis: {
            //x轴
            name: "group",
            position: "bottom", //设置坐标轴位置
            line: {
              //设置坐标轴样式
              stroke: "#c63c26", // 坐标轴线的颜色
              strokeOpacity: 0.8, // 坐标轴线的透明度，数值范围为 0 - 1
              lineDash: [3, 4], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
              lineWidth: 2 // 设置坐标轴线的粗细
            },
            label: {
              textStyle: {
                textAlign: "center", // 文本对齐方向，可取值为： start center end
                fill: "#404040", // 文本的颜色
                fontSize: "12", // 文本大小
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
              textFontSize: "12",
              fill: "#ccc"
            }
          },
          value: {
            //数据标记
            size: [],
            color: "red",
            label: {},
            opacity: "0.3",
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
  computed: {
    toDrawChart() {
      return this.$store.state.toDrawChart;
    },
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
    }
  },
  watch: {
    toDrawChart: function(curVal, oldVal) {
      console.log(this.toDrawChart, this.getChartXY, this.chartLayer);
      console.log(curVal, oldVal);
      if (curVal != oldVal && curVal == "bubbleChart") {
        console.log(this.toDrawChart, this.getChartXY, this.chartLayer);
        console.log("监听toDrawChart");
        this.initTest();
      }
    }
  },
  methods: {
    initTest() {
      const that = this;
      let divId = this.getContainer();

      this.chart = new G2.Chart({
        container: divId,
        height: 350,
        width: 600,
        padding: [50, 20, 50, 80],
        background: {
          fill: "#feeeed", //背景颜色 (给定数组)
          fillOpacity: 0.5, // 图表背景透明度
          stroke: "#7fb80e", // 图表边框颜色 (给定数组)
          strokeOpacity: 0.8, // 图表边框透明度
          opacity: 0.6, // 图表整体透明度
          lineWidth: 2, // 图表边框粗度
          radius: 15 // 图表圆角大小
        },
        data: this.sourceData
      });

      // this.chart.source(this.sourceData, {
      //     'group': {
      //         tickInterval: 1, // 自定义刻度间距
      //         nice: false, // 不对最大最小值优化

      //     },
      //     'ratio': {
      //         tickInterval: 20,
      //         nice: false,
      //         max: 100,
      //         min: 0
      //     },

      // });
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
      this.chart.axis("group", {
        position: "bottom", //设置横坐标位置
        line: {
          stroke: "#c63c26", // 坐标轴线的颜色
          strokeOpacity: 0.7, // 坐标轴线的透明度，数值范围为 0 - 1
          //lineDash: [3,4,4,7], // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
          lineWidth: 2 // 设置坐标轴线的粗细
        },
        label: {
          formatter: function formatter(val) {
            return val + " 组"; // 格式化坐标轴显示文本
          },
          textStyle: {
            fontSize: 12,
            textAlign: "center",
            fill: "#404040"
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
      this.chart.legend("gender", {});
      this.chart.tooltip({
        triggerOn: "click",
        title: "country"
      });
      this.chart
        .point()
        .position("group" + "*" + "ratio")
        .size("value", [8, 25])
        .label("value", {
          offset: 0, // 文本距离图形的距离
          textStyle: {
            fill: "white"
          }
        })
        .opacity(0.3)
        .shape("circle")
        .tooltip("group*value")
        .style({
          lineWidth: 1,
          stroke: "#1890ff"
        });
      this.chart.render();
      //this.$store.state.chartComponetArray.push(bubbleChart);
      this.$store.commit("pushDataSetToState", {
        dataset: this.bubblechartSet
      });
      console.log(this.$store.state.chartComponentArray[0].dataset);
    },
    getContainer() {
      let that = this;
      let divId = this.name + "-" + this.chartCount;
      this.container.push(divId);
      this.chartCount++;
      let div = document.createElement("div");
      div.setAttribute("id", divId);
      div.setAttribute("style", "position: absolute");
      div.style.postion = "absolute";
      document.getElementById(that.chartLayer).appendChild(div);
      return divId;
    },
    _getCenter: function() {
      var rect = this.$el.getBoundingClientRect()
      return {
        x: (rect.left + rect.right) / 2,
        y: (rect.bottom + rect.top) / 2
      }
    },
    
    resizeStart: function(e) {
      this.resizeStartX = e.clientX
      this.resizeStartY = e.clientY
      this.resizing = true
      this.lastW = this.localw
      this.lastH = this.localh
    },
    handleDown: function(e) {
      if (this.handle && !matchesSelector(e.target, this.handle)) {
        return
      }
      if (this.cancel && matchesSelector(e.target, this.cancel)) {
        return
      }
      if (!this.lastX) {
        this.lastX = e.clientX
        this.lastY = e.clientY
      }
      this.dragging = true
    },
    handleUp: function(e) {
      this.dragging = false
      this.resizing = false
      this.rotating = false
      this.$emit('handleUp', {
        x: this.localx,
        y: this.localy,
        w: this.localw,
        h: this.localh,
        r: this.localr
      })
    },
    handleMove: function(e) {
      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      if (this.dragging) {
        let deltax = e.clientX - this.lastX
        let deltay = e.clientY - this.lastY

        let deltaxround = Math.round(deltax / this.grid[0]) * this.grid[0]
        let deltayround = Math.round(deltay / this.grid[1]) * this.grid[1]

        let thisx = this.localx
        let thisy = this.localy

        if (this.grid[0] > 0 && this.grid[1] > 0) {
          if (this.axis === 'both') {
            thisx = deltaxround
            thisy = deltayround
          } else if (this.axis === 'x') {
            thisx = deltaxround
          } else if (this.axis === 'y') {
            thisy = deltayround
          }
        } else {
          if (this.axis === 'both') {
            thisx = e.clientX - this.lastX
            thisy = e.clientY - this.lastY
          } else if (this.axis === 'x') {
            thisx = e.clientX - this.lastX
          } else if (this.axis === 'y') {
            thisy = e.clientY - this.lastY
          }
        }

        this.localx = thisx
        this.localy = thisy
      }
      if (this.resizing) {
        this.localw = parseInt(this.lastW) + parseInt(e.clientX) - parseInt(this.resizeStartX)
        this.localh = parseInt(this.lastH) + parseInt(e.clientY) - parseInt(this.resizeStartY)
      }
    }
  },
  mounted() {
    //this.initTest();
    //this.pushToState();
     var el = document.documentElement
    var event = 'mousemove'
    var handler = this.handleMove

    if (el.attachEvent) {
      el.attachEvent('on' + event, handler)
    } else if (el.addEventListener) {
      el.addEventListener(event, handler, true)
    } else {
      el['on' + event] = handler
    }
  }
};
</script>

    