<template>
  <div v-bind:id="id" class='container'>
  </div>
</template>

<script>
import * as vega from 'vega'
import {mapGetters} from 'vuex'
import vegaEmbed from "vega-embed";
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
                        width: 100,
                        height: 100
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
        erd.listenTo(document.getElementById(this.Id), (element)=>{
            const width = element.offsetWidth
            const height = element.offsetHeight
            this.$nextTick(()=>{
                that.draw()
            })
        })
    },
    methods:{
        draw(){            
            vegaEmbed("#"+this.id, this.t, { theme: "default" });
        },
        aa(){
            this.$store.commit("commitPropsData", this.baseData)
        }
    },
    watch:{
        storeBaseData: {
            handler(newVal){
                let that = this
                if (newVal.id == 1){
                    that.draw()
                }
            }
        }
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