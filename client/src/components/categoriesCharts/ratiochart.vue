<template>
      <div @mousedown="move" id="lig" class="ligclass" v-bind:class="{'lg-bg': isInit}">
    </div>
      
</template>
<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from "@antv/g2";
import { mapState } from 'vuex';
export default {
  name: "ratioChart",
  data() {
    return {
      isInit:false,
      name: "ratioChart",
      chart:{},
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
          //ratio: 100
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
      // sourceData2: [
      //   {
      //     item: "高血压",
      //     group: 1,
      //     value: 44,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 2,
      //     value: 30,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 3,
      //     value: 20,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 4,
      //     value: 34,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 5,
      //     value: 12,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 6,
      //     value: 75,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 7,
      //     value: 33,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 8,
      //     value: 66,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 9,
      //     value: 44,
      //     //ratio: 100
      //   },
      //   {
      //     item: "高血压",
      //     group: 10,
      //     value: 80,
      //     //ratio: 40
      //   }
      // ]
      // ,

      bubblechartSet: {
        id: "010",
        category: "ratiochart", //种类
        container: {
          //布局
          height: '300',
          width: '500',
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
          title: "bubblechart",
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
       bubblechartSet2: {
        id: "001",
        category: "bubblechart", //种类
        container: {
          //布局
          height: 300,
          width: 500,
          padding: [30, 30, 30, 30],
          background: {
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
            triggerOn: "mousemove", //触发方式'mousemove'、'click'、'none'
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
              text: "组",
              textStyle: {
                textAlign: "center", // 文本对齐方向，可取值为： start center end
                fill: "#404040", // 文本的颜色
                fontSize: 12, // 文本大小
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
              textFontSize: 12,
              fill: "#ccc"
            }
          },
          value: {
            //数据标记
            size: [],
            color: "red",
            label: {},
            opacity: 0.3,
            shape: "circle",
            style: {}
          }
        },
        data: [],
        interaction: {}
      }
      ,
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
    },
    ...mapState({
      chartArray: state => state.chartIdArray,
      refreshData: state => state.chartChange,
    })
  },
  watch: {
    toDrawChart: function(curVal, oldVal) {
      console.log(this.toDrawChart, this.getChartXY, this.chartLayer);
      console.log(curVal, oldVal);
      if (curVal != oldVal && curVal == "bubbleChart") {
        // console.log(this.toDrawChart, this.getChartXY, this.chartLayer);
        // console.log("监听toDrawChart");
        this.initTest();
      }
    },
    'chartArray': {
      deep: true,
      handler() {
        this.initTest();
        this.isInit = !this.isInit
        // console.log("x:"+this.$store.state.chartX);
        // console.log("y:"+this.$store.state.chartY);
      }
    },
    'refreshData': {
      deep: true,
      handler() {
        if (this.$store.state.chartChange == "ratio") {
          console.log("收到数据更改了");
          this.chart.destroy();
          this.initTest();
        }
      }
    }
  },
  methods: {
     move (e) {
          let odiv = e.target;    //获取目标元素
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = (e)=>{    //鼠标按下并移动的事件
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;  
            let top = e.clientY - disY;
             
            //绑定元素位置到positionX和positionY上面
            this.positionX = top;
            this.positionY = left;
             
            //移动当前元素
            odiv.style.left = left + 'px';
            odiv.style.top = top + 'px';
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
     },
    initTest() {
      const that = this;
      let divId = this.getContainer();
      //console.log(this.bubblechartSet.meta.X_axis.label.text);
      this.chart = new G2.Chart({
        container: divId,
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
      this.$store.commit("pushDataSetToState", {
          "name":"Ratiochart",
          "interaction":"controlled"
      })
      // this.chart.destory();
      // this.chart.changeData(this.sourceData2);
      // this.chart.render();
      //this.$store.state.chartComponetArray.push(bubbleChart);
      /*
      this.$store.commit("pushDataSetToState", {
        dataset: this.bubblechartSet
      });
      */
      //console.log(this.$store.state.chartComponentArray[0].dataset);
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
      document.getElementById('lig').appendChild(div);
      return divId;
    },
  },
  mounted() {
    //this.initTest();
    //this.pushToState();
    //  var el = document.documentElement
    // var event = 'mousemove'
    // var handler = this.handleMove

    // if (el.attachEvent) {
    //   el.attachEvent('on' + event, handler)
    // } else if (el.addEventListener) {
    //   el.addEventListener(event, handler, true)
    // } else {
    //   el['on' + event] = handler
    // }
  }
};
</script>
<style scoped="scoped">
    .ligclass{
        width: 520px;
        height: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        position: absolute; 
    }
    .lg-bg{
        background-color: #f3f3f3;
    }
</style>





    