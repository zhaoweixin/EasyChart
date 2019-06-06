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
    <div>
      <a>Data Drag</a>
      <div id="staticdata">
        <ul></ul>
      </div>
    </div>
    <div>
      <el-button size="small" type="primary" @click="saveOption">click save</el-button>
    </div>
  </div>
</template>
<script>
import stores from "../../store/store.js";
import mutations from "../../store/mutation.js";
import $ from "jquery";
import * as d3 from "d3";
import store from '../../store/store.js';
import axios from "axios"
var htmlToImage = require('html-to-image');

require("webpack-jquery-ui");
require("webpack-jquery-ui/css");
$.extend({
  //读取指定csv文件的字段名
  csvtitle: function(url, f) {
    $.get(url, function(record) {
      record = record.split(/\n/);
      var title = record[0].split(",");
      f.call(this, title);
    });
  }
});
$.csvtitle("../../../static/data/testdata.csv", function(datas) {
  add(datas, "data1");
});
$.csvtitle("../../../static/data/ctestdata.csv", function(datas) {
  add(datas, "data2");
});
//name为表名，或者state存储的data数据昵称
function add(data, name) {
  var s = name;
  var x = 0;
  var adds = d3
    .select("#staticdata ul")
    .append("li")
    .attr("class", "dropdown");
  adds
    .append("a")
    .attr("data-toggle", "dropdown")
    .text(name)
    .append("i")
    .attr("class", "icon-arrow");
  //将csv数据中的字段显示出来
  adds
    .append("ul")
    .attr("class", "dropdown-menu")
    .selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .append("a")
    .text(function(d) {
      return d;
    });
  $("#staticdata ul")
    .children()
    .draggable({
      helper: "clone",
      scope: "ss",
      stop: function() {
        var left =
          $("#staticdata .ui-draggable-dragging").position().left -
          $(".el-aside").width() -
          $(".el-main").width();
        var top = $("#staticdata .ui-draggable-dragging").position().top;
        console.log(left + "," + top);
        if (left > 0 && top > 0) {
          //判断是否在合法区域
          console.log($(this).children()[0].text); //设置state中data的数据
        }
      }
    });
  clickdata();
}
var imgArray = [
  {
    id: 0,
    idView: require("../../../static/Image/barchart.png"),
    chartType: "barChart"
  },
  {
    id: 1,
    idView: require("../../../static/Image/linechart.png"),
    chartType: "testChart"
  },
  {
    id: 2,
    idView: require("../../../static/Image/piechart.png"),
    chartType: "testChart"
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
          d3.select(".el-main .ui-draggable-dragging").style(
            "z-index",
            function() {
              if (top < 0 || left < 0) {
                return -1;
              }
              if (
                left + $(".el-main .ui-draggable-dragging").width() >
                maxleft
              ) {
                return -1;
              }
              return 1;
            }
          );
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
          var item = {
            // chartname:chartType,
            chartname: "testChart",
            x: 0,
            y: 0,
            w: 4,
            h: 8,
            i: stores.state.chartIdArray.length,
            j:'item'+stores.state.chartIdArray.length ,
            color: "#828C88"
          };
          mutations.addIdToArray(stores.state, item);
        }
      });
    },
    deletClone: function(e) {
      $("#clone").remove();
    },
    saveOption: function(){
      htmlToImage.toPng(document.getElementById('screenShot'))
      .then(function (dataUrl) {
        var img = dataUrl;
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        var sendData = {
          "fileName": "image.png",
          "data": buf
        }
        axios.post("http://localhost:3000/saveOption", sendData ,function(callback){
          console.log(callback)
        })
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
  },
  watch: {}
};

function clickdata() {
  var dropdown = document.querySelectorAll(".dropdown");
  var dropdownArray = Array.prototype.slice.call(dropdown, 0);
  dropdownArray.forEach(function(el) {
    var button = el.querySelector('a[data-toggle="dropdown"]'),
      menu = el.querySelector(".dropdown-menu"),
      arrow = button.querySelector("i.icon-arrow");

    button.onclick = function(event) {
      if (!menu.hasClass("show")) {
        menu.classList.add("show");
        menu.classList.remove("hide");
        arrow.classList.add("open");
        arrow.classList.remove("close");
        event.preventDefault();
      } else {
        menu.classList.remove("show");
        menu.classList.add("hide");
        arrow.classList.remove("open");
        arrow.classList.add("close");
        event.preventDefault();
      }
    };
  });
  Element.prototype.hasClass = function(className) {
    return (
      this.className &&
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className)
    );
  };
}
</script>

<style>
@import "../../../static/css/selectData.css";
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
