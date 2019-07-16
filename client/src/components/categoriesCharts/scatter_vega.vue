<template>
    <div v-bind:id="id" class='container' @click="selectChart">
        <div v-bind:id="vegaid" class='container'>
        </div>
    </div>
</template>

<script>
import * as vega from 'vega';
import {mapGetters} from 'vuex';
import vegaEmbed from "vega-embed";
var elementResizeDetectorMaker = require("element-resize-detector")
import defaultData from "../../assets/baseData"
export default {
    name: "scatter_vega",
    props:{
        id:String,
        // baseData:{
        //     type:Object,
        //     default: function(){
        //         let data = {
        //             metaConfig: {
        //                 title: "scatter_vega"
        //             },
        //             style:{
        //                 color:['#ffffff']
        //             },
        //             id: this.id,
        //             data: this.$store.state.weatherData.pointData,
        //             width: 200,
        //             height: 200
        //         }
        //         return data
        //     }
        // }
    },
    data(){
        return {
            myChart: null,
            app: {},
            option: "",
            vegaid: this.id + "_vega",
            baseData:defaultData.scatter_vega.baseData,
        }
    },
    computed:{
        ...mapGetters({storeBaseData: 'getPropsData',
          WeatherScatterData :'getWeatherScatterData'
        }),
        t(){
            return{
                "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
                "description": this.baseData.metaConfig,
                "data": {"values": this.baseData.data},
                "mark": "point",
                "encoding": {
                    "x": {"field": "x","type": "ordinal"},
                    "y": {"field": "y","type": "quantitative"}
                },
                "width": this.baseData.width,
                "height": this.baseData.height,
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
        var erd = elementResizeDetectorMaker()
        erd.listenTo(document.getElementById(that.id), (element)=>{
            this.baseData.width = element.offsetWidth
            this.baseData.height = element.offsetHeight
            this.$nextTick(()=>{
                that.draw()
            })
        })

        this.$store.commit("pushDataSetToState", {
          "name":"Scatter_vega",
          "interaction":"controlled"
        })
    },
    methods:{
        draw(){
            vegaEmbed("#"+this.id + "_vega", this.t, { theme: "default" });
        },
        selectChart(){
            this.$store.commit("commitPropsData",this.baseData)
        },
        reDraw(newVal){
                    this.baseData.style.color = newVal.style.color,
                    this.baseData.metaConfig.title = newVal.metaConfig.title
                    this.baseData.data = newVal.data

          console.log(this.baseData)
                    this.draw()
    },
    },
    watch:{
        storeBaseData: {
            handler(newVal){
                if (newVal.id==this.id){
                    this.baseData.style.color = newVal.style.color,
                    this.baseData.metaConfig.title = newVal.metaConfig.title
                    this.baseData.data = newVal.data
                    this.draw()
                }
            },
          deep:true
        },
      WeatherScatterData:{
        handler(newVal){

          console.log(newVal)
          this.baseData.data = newVal;
          this.$store.commit("commitPropsData", this.baseData);


          console.log("ddd")
          console.log(this.baseData)
          this.draw()
        },
        deep:true
      }
    }
}
</script>

<style scoped>

  .container {
    height: 100%;
    width: 100%;
  }
</style>
