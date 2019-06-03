<template>

  <div v-bind:id="id" class='container'>
  </div>
</template>

<script>
  var elementResizeDetectorMaker = require("element-resize-detector")
  import echarts from 'echarts'
    export default {
        name: "LiZi",

      props:{
        id:String,
        baseData:{
          type:Object,
          default:function () {
            let a= {
              metaConfig: {
                title:'柱图'
              },
              style:{
                color:['#0050B3', '#1890FF', '#40A9FF', '#69C0FF']
              },
              data :[]
            }
            return a
          }
        }
      },
      data(){
          return{
            myChart:null,
            option:null

          }
      },
      mounted(){

          this.myChart=echarts.init(document.getElementById(this.id))
        this.option = {
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };
          this.myChart.setOption(this.option, true);

        var erd = elementResizeDetectorMaker()
        erd.listenTo(document.getElementById(this.id),  (element)=> {
          var width = element.offsetWidth
          var height = element.offsetHeight
          this.$nextTick(function () {
            //使echarts尺寸重置
            echarts.init(document.getElementById(this.id)).resize()
          })
        })
      }

    }
</script>

<style scoped>

  .container{
    height: 100%;
    width: 100%;
    /* border: 3px solid black; */
  }
</style>
