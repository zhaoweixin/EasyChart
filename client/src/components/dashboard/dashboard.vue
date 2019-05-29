<template>
<div>
    <div id='preview' style="background:rgba(0,0,0,0.05)">
        <div style="position:absolute">
            <svg id ='editorborad'></svg>
        </div>
        <!--add chart to here --> 
    </div>
    <grid-layout :layout="chartArray" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true"
        :vertical-compact="true" :use-css-transforms="true">
        <grid-item v-for="(item,index) in chartArray" :key='index' :x="item.x" :y="item.y" :w="item.wd" :h="item.hg" :i="item.i" :id="index">
          <!--span >{{item.i}}</span-->
          <component :is="item.chartname" :props="item.props"> </component>
        </grid-item>
      </grid-layout>
    <!--bubblechart></bubblechart-->
    <!-- <bubbleFre></bubbleFre> -->
    <!-- <gauge></gauge>
    <groupBar></groupBar>
    <groupPie></groupPie>
    <lineC></lineC>
    <map></map>
    <pie></pie>
    <radar></radar>
    <ratio></ratio> -->
</div>
</template>

<script>

import { mapState,mapGetters } from 'vuex';
import VueGridLayout from 'vue-grid-layout';
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

import * as d3 from "d3";
export default {
    data() {
    return {
        container: "", //canvas to drawing blueprint
        gridLayer: "gridLayer",
        chartLayer: "preview",
        componentContainer: "componentContainer",
        show: false,
        // chartArray:this.chartArray
        // chartArray:[]
    }
    },
    mounted() {
        this.chartInit("#preview")
    },
    computed: {
    //     ...mapState({
    //         chartArray: state => state.chartIdArray
    // }),
        // ...mapAction({
        //     addChart: 'createAction'
        // }),
        ...mapGetters(['chartArray'])
        // chartArray(){
        //     return this.$store.state.chartIdArray;
        //     }
    

    },
    watch: {
        'chartArray': {
            deep: true,
            handler: function() {
                console.log("可以添加视图了");
                console.log("wandh2"+ this.$store.state.chartIdArray[0].hg)
            }
        }
    },
    methods: {
        // function1(){
        //     //this.$refs.bub.initChart();
        //     console.log('hello');
        //     this.$store.commit("setChartXY", {"x": 100, "y": 100})
        //     console.log("x坐标"+ this.$store.state.chartX + 'y轴' + this.$store.state.chartY);
        //     this.$store.commit("toDrawChart", {"toDrawChart": "bubbleChart"})
        //     //this.$refs.bubblechart.initTest(); 
        // },
        // function2() {
        //     this.chartArray.push('001')
        // },
        // click() {
        //     //this.$refs.bub.initChart();
        //     //this.$refs.bubblechart.initTest();
        // },
        chartInit(container){
            let that = this
            this.container = d3.select("#editorborad")
            this.container.append("g").attr("id", that.gridLayer)
            this.$store.commit("setChartLayer", {"chartLayer": that.chartLayer})
            this.chartResize(window.innerWidth * 0.77, window.innerHeight * 0.92)
        },
        chartResize(width, height){
            let that = this
            let drawGrids = function(width, height){
                let lineData = []
                for (let i = 10; i < width; i += 20) {
                    lineData.push({ "x1": i, "y1": 0, "x2": i, "y2": height });
                }
                for (let i = 10; i < height; i += 20) {
                    lineData.push({ "x1": 0, "y1": i, "x2": width, "y2": i });
                }
                if(that.container != ""){
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
            }

            d3.select("#editorborad")
                .attr("width", width)
                .attr("height", height);

            drawGrids(width, height);
            
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
        GridLayout : VueGridLayout.GridLayout,
        GridItem : VueGridLayout.GridItem,
    }
}

</script>
    
<style scoped="scoped">
    .moves{      
    z-index: 999; 
    }
</style>
