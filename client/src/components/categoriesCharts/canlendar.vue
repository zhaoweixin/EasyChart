<template>
  <div v-bind:id="id" class='container' @click="selectChart">
  </div>
</template>

<script>
  var elementResizeDetectorMaker = require("element-resize-detector")
  import { mapGetters} from 'vuex'
  import echarts from 'echarts'
  export default {
        name: "canlendar",
      props:{
          id:String

      },
      data(){
        return {
          myChart:"",
          option:"",
          baseData:{
                metaConfig:{
                  title:"日历图",
                },
                style:{
                  color:['#e0ffff', '#006edd']
                },
                id:this.id,
                data:this.getVirtulData(2017)
              }
          }
      },
      computed:{
        ...mapGetters({'storeBaseData': 'getPropsData'}),
      },
      methods:{
        selectChart(){
          this.$store.commit("commitPropsData",this.baseData)

        },
        getVirtulData(year) {
          // year = year;
          var date = +echarts.number.parseDate(year + '-01-01');
          var end = +echarts.number.parseDate((+year + 1) + '-01-01');

          console.log(date)
          var dayTime = 3600 * 24 * 1000;
          var data = [];
          for (var time = date; time < end; time += dayTime) {
            data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              Math.floor(Math.random() * 1000)
            ]);
          }
          return data;
        }
      },
      mounted(){
        this.myChart=echarts.init(document.getElementById(this.id))

        this.option = {
          tooltip: {
            position: 'top',
            formatter: function (p) {
              var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
              return format + ': ' + p.data[1];
            }
          },
          visualMap: {
            min: 0,
            max: 1000,
            calculable: true,
            orient: 'vertical',
            left: '250',
            top: 'center',
            inRange: {
              color: this.baseData.style.color,
              opacity: 1
            },
            controller: {
              inRange: {
                opacity: 0.5
              }
            }
          },

          calendar: [
            {
              cellSize: [20, 'auto'],
              bottom: 10,
              orient: 'vertical',
              range: '2017',
              dayLabel: {
                margin: 5
              }
            }],

          series: [{
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.baseData.data
          }]
        };

        this.myChart.setOption(this.option,true)
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
  .container {
    height: 100%;
    width: 100%;
    border: 3px solid white;
  }
</style>
