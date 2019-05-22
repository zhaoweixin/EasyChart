<template>
  <div id="Store">
    <div>
      Echart Img example
      <el-carousel :interval="4000" type="card" height="70px">
        <el-carousel-item v-for="item in imgArray" :key="item.id">
          <el-row>
            <el-col :span="24">
              <img
                ref="imgHeight"
                :src="item.idView"
                @mouseover="createClone($event,item.chartType,'echarts')"
                @mouseout="deletClone($event)"
              >
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      D3 Img example
      <el-carousel :interval="4000" type="card" height="70px">
        <el-carousel-item v-for="item in imgArray" :key="item.id">
          <el-row>
            <el-col :span="24">
              <img
                ref="imgHeight"
                :src="item.idView"
                @mouseover="createClone($event,item.chartType,'D3')"
                @mouseout="deletClone($event)"
              >
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
require("webpack-jquery-ui");
require("webpack-jquery-ui/css");
// var DefaultJson = {
//   ParentId: "container",
//   data: [120, 200, 150, 80, 70, 110, 130],
//   xAxist: {
//     type: "category",
//     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//   },
//   yAxist: {
//     type: "value",
//     data: null
//   }
// };
// var BarEchartJson = {
//   ToolType: "Echart",
//   ParentId: null,
//   ChartType: "bar",
//   xAxist: {
//     type: "category",
//     data: null
//   },
//   yAxist: {
//     type: "value",
//     data: null
//   },
//   data: null,
//   Style: null
// };
// var LineEchartJson = {
//   ToolType: "Echart",
//   ParentId: "container",
//   ChartType: "line",
//   xAxist: {
//     type: "category",
//     data: null
//   },
//   yAxist: {
//     type: "value",
//     data: null
//   },
//   data: null,
//   Style: null
// };
// var PieEchartJson = {
//   ToolType: "Echart",
//   ParentId: "container",
//   ChartType: "pie",
//   xAxist: {
//     type: "category",
//     data: null
//   },
//   yAxist: {
//     type: "value",
//     data: null
//   },
//   data: null,
//   Style: null
// };
// var JsonArry = [BarEchartJson, LineEchartJson, PieEchartJson];
var imgArray = [
  {
    id: 0,
    idView: require("../../../static/Image/barchart.png"),
    chartType: "barchart"
  },
  {
    id: 1,
    idView: require("../../../static/Image/linechart.png"),
    chartType: "linechart"
  },
  {
    id: 2,
    idView: require("../../../static/Image/piechart.png"),
    chartType: "piechart"
  }
];
export default {
  name: "ChartStore",
  data() {
    return { imgArray };
  },
  methods: {
    createClone: function(e, chartType, type) {
      $(e.currentTarget)
        .clone(true)
        .appendTo(".el-main")
        .attr("id", "clone")
        .css("position", "absolute")
        .css("height", "200px")
        .css("width", "200px")
        .css("top", function() {
          var y = $(e)[0].clientY - 80 + "px";
          // console.log($(e).clientY);
          // console.log(y);
          return y;
        })
        .css("left", "15%");
      $(e.currentTarget).draggable({
        appendTo: ".el-main",
        start: function() {
          $(".el-main .ui-draggable")
            .css("width", "200px")
            .css("height", "200px");
        },
        drag: function(event, ui) {
          var maxleft = $(".el-main").width();
          var top =
            $(".el-main .ui-draggable-dragging").position().top -
            $(".el-menu-demo").height();
          var left =
            $(".el-main .ui-draggable-dragging").position().left -
            $(".el-aside").width();
          $(".el-main .ui-draggable-dragging").css("z-index", function() {
            if (top < 0) {
              return -1;
            }
            if (left + $(".el-main .ui-draggable-dragging").width() > maxleft) {
              return -1;
            }
            return 1;
          });
        },
        helper: "clone",
        scope: "ss",
        stop: function(e) {
          var top =
            $(".el-main .ui-draggable-dragging").position().top -
            $(".el-menu-demo").height();
          var left =
            $(".el-main .ui-draggable-dragging").position().left -
            $(".el-aside").width();
          //there use state function
          /**
           * function state (top,left,chartType,type)
           *
           * top and left is chart position
           * type:tool type
           */
          console.log(top + "," + left);
          console.log('cba');
        }
      });
    },
    deletClone: function(e) {
      $("#clone").remove();
    }
    // clickImg: function(id) {
    //   var ChartJson = JsonArry[id];
    //   ChartJson = AnalysisJson(ChartJson);
    //   console.log(ChartJson);
    //   var mychart = this.InitEchart(ChartJson.ParentId);
    //   if (mychart != null) {
    //     if (ChartJson.ChartType != "pie")
    //       this.DrawLineAndBarEchart(mychart, ChartJson);
    //     else {
    //       this.DrawPieChart(mychart, ChartJson);
    //     }
    //   }
    //   console.log();
    // },
    // InitEchart: function(Chartparent) {
    //   if (Chartparent == null) {
    //     alert("error");
    //     return;
    //   }

    //   var echarts = require("echarts");
    //   var dom = document.getElementById(Chartparent);
    //   var myChart = echarts.init(dom);
    //   return myChart;
    // },
    // DrawLineAndBarEchart: function(myChart, ChartJson) {
    //   if (myChart == null || ChartJson == null) {
    //     alert("error");
    //     return;
    //   }
    //   var option = null;
    //   option = {
    //     xAxis: {
    //       type: "category",
    //       data: ChartJson.xAxist.data
    //     },
    //     yAxis: {
    //       type: "value",
    //       data: ChartJson.yAxist.data
    //     },
    //     series: [
    //       {
    //         data: ChartJson.data,
    //         type: ChartJson.ChartType
    //       }
    //     ]
    //   };
    //   if (option && typeof option === "object") {
    //     myChart.setOption(option, true);
    //   }
    // },
    // DrawPieChart: function(myChart, ChartJson) {
    //   if (myChart == null || ChartJson == null) {
    //     alert("error");
    //     return;
    //   }
    //   var option = null;
    //   option = {
    //     series: [
    //       {
    //         data: ChartJson.data,
    //         type: ChartJson.ChartType
    //       }
    //     ]
    //   };
    //   if (option && typeof option === "object") {
    //     myChart.setOption(option, true);
    //   }
    // },
    // start: function(e) {
    //   //鼠标左键点击
    //   if (e.button == 0) {
    //     this.canDrag = true;
    //     //记录鼠标指针位置
    //     this.x0 = e.clientX;
    //     this.y0 = e.clientY;
    //     console.log(e);
    //   }
    // },
    //   stop: function(e) {
    //     console.log(window.document.querySelector("#app main").offsetLeft);
    //     console.log(window.document.querySelector("#app main").offsetTop);
    //     console.log(window.document.querySelector("#app main").scrollHeight);
    //     console.log(window.document.querySelector("#app main").scrollWidth);
    //     this.canDrag = false;
    //     console.log(e);
    //   },
    //   move: function(e) {
    //     if (this.canDrag == true) {
    //       this.x1 = e.clientX;
    //       this.y1 = e.clientX;
    //       let x = this.x1 - this.x0;
    //       let y = this.y1 - this.y0;
    //       let img = document.querySelector("#Store img");
    //       this.style = `left:${img.offsetLeft + x}px;top:${img.offsetTop +
    //         y}px;opacity:1`;
    //       this.x0 = this.x1;
    //       this.y0 = this.y1;
    //     }
    // }
  }
};
// function AnalysisJson(ChartJson) {
//   if (ChartJson == null) {
//     alert("error");
//     return;
//   }
//   if (ChartJson.ParentId == null) ChartJson.ParentId = DefaultJson.ParentId;

//   if (ChartJson.data == null) {
//     if (ChartJson.ChartType == "pie") {
//       var data = [];
//       for (var i = 0; i < DefaultJson.data.length; i++) {
//         var child = {
//           value: null,
//           name: null
//         };
//         child.value = DefaultJson.data[i];
//         child.name = DefaultJson.xAxist.data[i];
//         data.push(child);
//       }
//       ChartJson.data = data;
//     } else {
//       ChartJson.data = DefaultJson.data;
//       if (ChartJson.xAxist.data == null && ChartJson.yAxist.data == null) {
//         ChartJson.xAxist.data = DefaultJson.xAxist.data;
//         ChartJson.yAxist.data = DefaultJson.yAxist.data;
//       }
//     }
//   }

//   return ChartJson;
// }
// var test = {
//   testmethods: [
//     {
//       LineAndBar: function(d) {
//         console.log(d);
//         return d;
//       },
//       testtwo: function(d) {
//         return d;
//       }
//     }
//   ]
// };
// console.log(test.testmethods[0].testtwo(2));
</script>
<style>
#Store img {
  width: 100px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
