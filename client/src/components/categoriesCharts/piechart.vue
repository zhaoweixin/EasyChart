<template>
  <div v-bind:id="id" class='container' @click="selectChart">
    <div v-bind:id="g2id" class='container'>
    </div>
    </div>
</template>

<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
var elementResizeDetectorMaker = require("element-resize-detector")
import G2 from "@antv/g2";
import { mapState,mapGetters } from 'vuex';
import $ from "jquery";
export default {
  name: "lineChart",
  props:{
        id:String,
        baseData: {
          type:Object,
          default: function() {
            let a= {
              metaConfig: {
                title:'扶贫'
              },
              style:{
                color:['#35c17c','#af7eff',
                  '#3bcaff','#27C181',
                  '#FE902D','#FCCA74']
              },
              id:this.id,
              data : this.$store.state.weatherData.pieData,
              width: 484,
              height: 310,
          }
              return a;

          }
        }
      },
  data() {
    return {
      isInit:false,
      name: "lineChart",
      chart:{},
      g2id: this.id + "_g2"
    };
  },
  computed: {
    ...mapState({
      chartArray: state => state.chartIdArray,
      refreshData: state => state.chartSizeChange,
    }),
    ...mapGetters({ storeBaseData: "getPropsData"})
  },
  watch: {
    // 'refreshData': {
    //   deep:true,
    //   handler() {
    //     //this.chart.changeSize(this.$store.state.chartSizeChange.newWidth,this.$store.state.chartSizeChange.newHeight);
    //     console.log("更改了wh")
    //   }
    // },
    storeBaseData: {
      handler(newVal) {
        if (newVal.id == this.id) {
          this.chart.repaint();
        }
      },
      deep: true
    },
  },
  mounted() {
    let that = this;
    this.initChart();

    var erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById(this.id),  (element)=> {
          var width = element.offsetWidth
          var height = element.offsetHeight

          this.$nextTick(function () {
            console.log("实现了");
            //that.chart.changeSize(width,height);
            //echarts.init(document.getElementById(this.id)).resize()
            this.chart.changeSize(width,height)
          })
        })
  },
  methods: {
    selectChart() {
      this.$store.commit("commitPropsData", this.baseData);
    },
    initChart() {
      this.chart = new G2.Chart({
        container: this.g2id,
        width: this.baseData.width,
        height: this.baseData.height,
      })
      this.chart.source(this.baseData.data, {
        percent: {
          formatter: function formatter (val) {
            val = (val * 100).toFixed(2) + '%'
            return val
          }
        }
      })
      this.chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      })
      this.chart.legend(false)
      // this.chart.coord('theta', {
      //   radius: 1
      // })
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      })

      this.chart.intervalStack().position('percent')
        .color('item',this.baseData.style.color)
        .label('percent', {
          // autoRotate: false,
          formatter: function formatter (val, item) {
            return item.point.item + ': ' + val
          }
        })
        .tooltip('item*percent', function (item, percent) {
          percent = (percent * 100).toFixed(2) + '%'
          return {
            name: item,
            value: percent
          }
        }).style({
          lineWidth: 1,
          stroke: '#fff'
        }).select({
          animate: false,

        }).animate({
          delay:100,
          duration: 60
        })

      //点击交互
      this.chart.on('interval:click', ev=> {
        console.log("shuju"+ev)
        const shape = ev.shape;
        if (ev.shape.get('selected')?true :false) {
          const data =ev.data._origin;
          this.$store.commit("commitInteracBarData", data.item)
          this.$store.commit("commitInteracCanlendarData", data.item)
          this.$store.commit("commitInteracScatterData", data.item)
          console.log('yibufen')
        }
        else
        {
          this.$store.commit("commitZongWeatherData",1)
          console.log('quanbu')
        };
      });
      this.chart.render()
    },

  }

};
</script>


<style scoped>

  .container {
    height: 100%;
    width: 100%;
    border: 3px solid white;
  }
</style>




