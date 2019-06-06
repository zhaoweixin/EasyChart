<template>
  <div v-bind:id="id" class='container' @click="selectChart">
  </div>
</template>

<script>
import * as vega from 'vega';
import {mapGetters} from 'vuex';
import vegaEmbed from "vega-embed";
var elementResizeDetectorMaker = require("element-resize-detector")
export default {
    name: "linechart_vega",
    props:{
        id:String,
        baseData:{
            type:Object,
            default: function(){
                let data = {
                    metaConfig: {
                        title: "linechart_vega"
                    },
                    style:{
                        color:['#ffffff'],
                    },
                    id: this.id,
                    data: [
                        {"x": 1990, "y": 0},
                        {"x": 2000, "y": 2010},
                        {"x": 2010, "y": 0},
                        {"x": 2020, "y": 2030},
                        {"x": 2030, "y": 0}
                    ]
                }
                return data
            }
        }
    },
    data(){
        return {
            myChart: null,
            app: {},
            option: ""
        }
    },
    computed:{
        ...mapGetters({'storeBaseData': 'getPropsData'}),
        t(){
            return{
                "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
                "description": this.baseData.metaConfig,
                "data": {"values": this.baseData.data},
                "mark": "line",
                "encoding": {
                    "x": {"field": "x", "type": "quantitative"},
                    "y": {"field": "y", "type": "quantitative"}
                },
                "width": this.baseData.style.width,
                "height": this.baseData.style.height,
                "autosize": {
                    "type": "fit",
                    "contains": "padding"
                }
            }
        }
    },
    mounted(){
        let that = this
        this.draw() 
        //vegaEmbed("#canvas", result, { theme: "default" });
        var erd = elementResizeDetectorMaker()
        erd.listenTo(document.getElementById(that.id), (element)=>{
            console.log(this.baseData.style.width)
            // this.baseData.style.width = element.offsetWidth
            // this.baseData.style.height = element.offsetHeight
            this.$nextTick(()=>{
                that.draw()
            })
        })
    },
    methods:{
        draw(){
            console.log(this.t)         
            vegaEmbed("#"+this.id, this.t, { theme: "default" });
        },
         selectChart(){
        //commit传值
        this.$store.commit("commitPropsData",this.baseData)
      }

    },
    watch:{
    //     storeBaseData: {
    //     handler(newVal){
    //       if (newVal.id==this.id){
    //         this.draw({
    //           color:newVal.style.color,
    //           title:{
    //             text: newVal.metaConfig.title
    //           },
    //           series:{
    //             data:newVal.data
    //           }
    //         })
    //       }

    //       // console.log(newVal)
    //     },
    //     deep:true
    //   }
    }
}
</script>

<style scoped>

  .container {
    height: 100%;
    width: 100%;
    border: 3px solid white;
  }
</style>