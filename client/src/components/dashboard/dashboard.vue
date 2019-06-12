<template>
  <div>
    <div id="preview" style="background:rgba(0,255,0,0.05)">
      <div id="box" style="position:absolute;">
        <svg id="editorborad" v-on:click="getData"></svg>
      </div>
      <el-button class='popup' type="text" @click="open">Save As Template</el-button>
    </div>
    <div class="test" v-on:click="getData">
      <grid-layout
        class="gridLayout"
        :layout="chartArray"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <div @click.stop v-on:dblclick="changeStatic">
          <grid-item
            v-for="(item,index) in chartArray"
            :key="index"
            :static="item.static"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :id="index"
            :style="{backgroundColor:item.color}"
            @resized="resizedEvent"
            @click.native="getId(item.i)"
          >
            <component :is="item.chartname" :id="item.j" :props="item.props" ></component>
          </grid-item>
        </div>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VueGridLayout from "vue-grid-layout";
import bubblechart from "../categoriesCharts/bubblechart.vue";
import bubbleFrequencyChar from "../categoriesCharts/bubbleFrequencyChart.vue";
import gaugechart from "../categoriesCharts/gaugechart.vue";
import groupBarChart from "../categoriesCharts/groupBarChart.vue";
import groupPieChart from "../categoriesCharts/groupPieChart.vue";
import lineChart from "../categoriesCharts/linechart.vue";
import mapBoxView from "../categoriesCharts/mapBoxView.vue";
import piechart from "../categoriesCharts/piechart.vue";
import radarChart from "../categoriesCharts/radarChart.vue";
import ratiochart from "../categoriesCharts/ratiochart.vue";
import testChart from "../categoriesCharts/testChart.vue";
import barChart from "../categoriesCharts/barChart.vue";
import linechart_vega from "../categoriesCharts/linechart_vega.vue";
import scatter_vega from "../categoriesCharts/scatter_vega.vue"
import canlendar from  "../categoriesCharts/canlendar.vue"

import * as d3 from "d3";
export default {
  data() {
    return {
      container: "", //canvas to drawing blueprint
      gridLayer: "gridLayer",
      chartLayer: "preview",
      baseData: {  //基本配置
        metaConfig: {
          title: ""
        },
        style: {
          backgroundColor: "",
          fontColor: "" //字体颜色
        },
        data: [],
        button:'apply to all charts'
      },
      show: false,
      changeColor: false,
    };
  },
  mounted() {
    this.chartInit("#preview");
  },
  computed: {
    ...mapGetters(['getIsActive','chartArray']),
    ...mapGetters({ 'storeBaseData': "getPropsData" }),
  },
  watch: {
    storeBaseData: {   //将改变的颜色赋值给背景色
      handler(newVal){
        document.getElementById("box").style.backgroundColor=newVal.style.backgroundColor;
      },
      deep:true
    },
    'getIsActive':{  //点击apply to all charts就将改变的颜色赋给所有子图
      handler(newVal){
          this.applyColor();
      },
    }
  },
  methods: {
     changeStatic(event){
       let i = event.path[3].id;
        i = i.charAt(i.length - 1);
       this.$store.commit("changeStatic",i)
       console.log(i)
    },
    getData() { //获取baseData里的内容，并传进state里
      this.$store.commit("commitPropsData", this.baseData);
    },
    applyColor(){
      let that = this
      var chartArray =that.chartArray.map(
        function(item,index,array){
          console.log(that.getIsActive)
          return item.color = that.baseData.style.backgroundColor
        });
    },
    open() {
        this.$prompt('请输入模板名称','Save' ,{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '模板名称不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '模板名是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

    chartInit(container) {
      let that = this;
      this.container = d3.select("#editorborad");
      this.container.append("g").attr("id", that.gridLayer);
      this.$store.commit("setChartLayer", { chartLayer: that.chartLayer });
      this.chartResize(window.innerWidth * 0.77, window.innerHeight);
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        this.$store.commit('commitChange',{newWidth:newWPx,newHeight:newHPx});
    },
    chartResize(width, height) {
      let that = this;
      let drawGrids = function(width, height) {
        let lineData = [];
        for (let i = 10; i < width; i += 20) {
          lineData.push({ x1: i, y1: 0, x2: i, y2: height });
        }
        for (let i = 10; i < height; i += 20) {
          lineData.push({ x1: 0, y1: i, x2: width, y2: i });
        }
        if (that.container != "") {
          that.container
            .select("#gridLayer")
            .selectAll("*")
            .remove();

          that.container
            .select("#gridLayer")
            .selectAll(".grid_lines")
            .data(lineData)
            .enter()
            .append("line")
            .attr("x1", d => d.x1)
            .attr("x2", d => d.x2)
            .attr("y1", d => d.y1)
            .attr("y2", d => d.y2)
            .attr("stroke", "#00000030");
        }
      };

      d3.select("#editorborad")
        .attr("width", width)
        .attr("height", height);
      if (this.show) { //是否绘制网格
        drawGrids(width, height);
      }
    },
    getId(item){
      console.log("得到ID了"+ item);
    }
  },
  components: {
    bubblechart,
    bubbleFrequencyChar,
    gaugechart,
    groupBarChart,
    groupPieChart,
    lineChart,
    mapBoxView,
    piechart,
    radarChart,
    ratiochart,
    testChart,
    barChart,
    linechart_vega,
    scatter_vega,
    canlendar,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  }
};
</script>
<style>
.popup{
  height: 10px;
  width: 50px;
  position: absolute;
  top:50px;
  left:1625px;
}
.gridLayout {
  /* background: #00f; */
  height: 1800px;
  width: 100%;
}
</style>


