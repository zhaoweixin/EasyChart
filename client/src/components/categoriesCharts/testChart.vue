<template>

  <div v-bind:id="id" class='container'>
  </div>
</template>

<script>
  var elementResizeDetectorMaker = require("element-resize-detector")

  import echarts from 'echarts'
  export default {
    name: "funnel",
    props: {
      w: Number,
      h:Number,
      id: String
    },
    data(){
      return {
        myChart:"",
        app:{},
        option:"",
        funneldata:[{"name": "建档居民", "value": "2235030"}, {"name": "体检居民", "value": "1167906"}, {
          "name": "签约居民",
          "value": "21039"
        }, {"name": "个性化签约居民", "value": 10872}]
      }
    },
    methods: {
      draw(){
        //  console.log(d3.select('#2'))
        const container=document.getElementById(this.id)
        console.log(this.id, container)
        this.myChart = echarts.init(container);
        this.myChart.setOption(this.t)
      }

    },

    mounted(){
      this.draw()
      var erd = elementResizeDetectorMaker()
      erd.listenTo(document.getElementById(this.id),  (element)=> {
        var width = element.offsetWidth
        var height = element.offsetHeight
        this.$nextTick(function () {
          console.log("Size: " + width + "x" + height)
          //使echarts尺寸重置
          echarts.init(document.getElementById(this.id)).resize()
        })
      })
    },

    computed:{
      t(){
        return{
          color: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF'],
          title: {
            text: '漏斗图',
            // subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
          },
          // toolbox: {
          //     feature: {
          //         dataView: {readOnly: false},
          //         restore: {},
          //         saveAsImage: {}
          //     }
          // },
          // legend: {
          //   data: ['建档居民', '体检居民', '签约居民', '个性化签约居民']
          // },
          calculable: true,
          series: [
            {
              name: '漏斗图',
              type: 'funnel',
              left: '10%',
              top: 60,
              //x2: 80,
              bottom: 60,
              // width: '80%',
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data:[{"name": "建档居民", "value": "2235030"}, {"name": "体检居民", "value": "1167906"}, {
                "name": "签约居民",
                "value": "21039"
              }, {"name": "个性化签约居民", "value": 10872}]
            }
          ]
        };
      },
    },
    // watch:{
    //   w:function () {
    //     this.t(this.funneldata)
    //     window.addEventListener("resize",function () {
    //       this.myChart.resize();
    //     })
    //   }
    // }

  }
</script>

<style scoped>

  .container {
    height: 100%;
    width: 100%;
    /*border: 3px solid black;*/
  }
</style>
