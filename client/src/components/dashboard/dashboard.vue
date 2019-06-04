<template>
  <div>
    <div id="preview" style="background:rgba(0,255,0,0.05)">
      <div id="box" style="position:absolute;backgroundColor:">
        <svg id="editorborad" v-on:click="getData"></svg>
      </div>
      <!--add chart to here -->
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
        <div @click.stop>
          <grid-item
            v-for="(item,index) in chartArray"
            :key="index"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :id="index"
            :style="{backgroundColor:item.color}"
          >
            <component :is="item.chartname" :id="item.j" :props="item.props"></component>
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

import * as d3 from "d3";
export default {
  data() {
    return {
      container: "", //canvas to drawing blueprint
      gridLayer: "gridLayer",
      chartLayer: "preview",
      baseData: {
        metaConfig: {
          title: ""
        },
        style: {
          backgroundColor: "",
          fontColor: ""
        },
        data: [],
        button:'apply to all charts'
      },
      show: false,
      changeColor: false,
      // chartArray: [
      //   {
      //     chartname: "testChart",
      //     x: 0,
      //     y: 0,
      //     w: 2,
      //     h: 7,
      //     i: "1",
      //     color: "#AED654"
      //   },
      //   {
      //     chartname: "barChart",
      //     x: 0,
      //     y: 0,
      //     w: 2,
      //     h: 7,
      //     i: "2",
      //     color: "#AED581"
      //   },
      //   {
      //     chartname: "testChart",
      //     x: 0,
      //     y: 0,
      //     w: 2,
      //     h: 7,
      //     i: "3",
      //     color: "#AEDfff"
      //   }
      // ]
      // chartArray:this.chartArray
      // chartArray:[]
    };
  },
  mounted() {
    this.chartInit("#preview");
  },
  computed: {
    ...mapGetters(['getIsActive','chartArray']),
    ...mapGetters({ 'storeBaseData': "getPropsData" })
  },
  watch: {
    storeBaseData: {
      handler(newVal){
        document.getElementById("box").style.backgroundColor=newVal.style.backgroundColor;
      },
      deep:true
    },
    'getIsActive':{
      handler(newVal){
        if(newVal){
          this.applyColor()
        }
      }
    }
  
  },
  methods: {
    getData() {
      this.$store.commit("commitPropsData", this.baseData);
    },
    applyColor(){
      let that = this 
      that.storeArray = that.chartArray;
      
      // for(let item in that.chartArray){
      //   console.log('fjrljglrkjgmlkdmg'+item)
      //   console.log(item)
      //   this.item.color = this.baseData.style.backgroundColor;
      // }

    },

    chartInit(container) {
      let that = this;
      this.container = d3.select("#editorborad");
      this.container.append("g").attr("id", that.gridLayer);
      this.$store.commit("setChartLayer", { chartLayer: that.chartLayer });
      this.chartResize(window.innerWidth * 0.77, window.innerHeight);
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
      if (this.show) {
        drawGrids(width, height);
      }
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
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  }
};
</script>
<style>
.gridLayout {
  /* background: #00f; */
  height: 1800px;
  width: 100%;
}
</style>


