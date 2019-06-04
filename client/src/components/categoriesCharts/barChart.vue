<template>

  <div v-bind:id="id" class='container' @click="clickChart">
  </div>
</template>

<script>
  var elementResizeDetectorMaker = require("element-resize-detector")
  import { mapGetters} from 'vuex'
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
              id:this.id,
              data :[{"name": "Mon", "value": "10"}, {"name": "Tue", "value": "706"}, {
                "name": "Wed",
                "value": "239"
              }, {"name": "Thu", "value": 172}]
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
      computed:{
        ...mapGetters({'storeBaseData': 'getPropsData'}),
      },
      methods:{
        clickChart(){
            this.$store.commit("commitPropsData",this.baseData)

        },
        comArray(data,name){
          let arr=[]
          for (let i=0;i<data.length;i++) {
            // console.log(data.name)
            arr.push(data[i][name])
          }
          return arr
        }
      },
      mounted(){


          console.log(this.comArray(this.baseData.data,"name"))


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
              data : this.comArray(this.baseData.data,"name"),
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
              data:this.comArray(this.baseData.data,"value")
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
      },
      watch:{    //野
        storeBaseData: {
          handler(newVal){
            if (newVal.id==2){
              this.myChart.setOption({
                xAxis:[
                  {
                    data:this.comArray(newVal.data,"name")
                  }
                ],
                series:{
                  data:this.comArray(newVal.data,"value")
                }
              })
            }

            console.log(newVal)
          },
          deep:true
        }
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
