<template>
<div>
    <button id="btn" @click="function1"></button>
    <div id='preview' style="background:rgba(0,0,0,0.05)">
        <div style="position:absolute">
            <svg id ='editorborad'></svg>
        </div>
        <!--add chart to here -->
    </div>
    <bubble></bubble>
</div>
</template>

<script>
//import {mapState,mapAction} from vuex
import bubble from "../categoriesCharts/bubblechart.vue"
import * as d3 from "d3";
export default {
    data() {
    return {
        container: "", //canvas to drawing blueprint
        gridLayer: "gridLayer",
        chartLayer: "preview",
        componentContainer: "componentContainer"
        //dashboard: this.$store.chartCategory //获取Chart数组
    }
    },
    computed: {
        // ...mapState([
        //     'chartCategory'
        // ]),
        // ...mapAction({
        //     addChart: 'createAction'
        // }),
    },
    methods: {
        function1(){
            //this.$refs.bub.initChart();
            console.log('hello');
            this.$store.commit("setChartXY", {"x": 100, "y": 100})
            this.$store.commit("toDrawChart", {"toDrawChart": "bubbleChart"})
            //this.$refs.bubblechart.initTest();
        },
        click() {
            //this.$refs.bub.initChart();
            //this.$refs.bubblechart.initTest();
        },
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

            drawGrids(width, height)
        }
    },
    components: {
        bubble,
    },
    mounted() {
        this.chartInit("#preview")
    }
}

</script>
    
