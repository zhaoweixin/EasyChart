<template>

  <div v-bind:id="id" class='container' @click="selectChart">
    <div v-bind:id="g2id" class="container_2">
      <div id="linechart_top">
      </div>
      <div id="slider" class="slider_1"></div>
    </div>
  </div>

</template>


<script>
var elementResizeDetectorMaker = require("element-resize-detector")
import G2 from "@antv/g2";
const slider = require("@antv/g2-plugin-slider");
import { DataSet } from "@antv/data-set";
import { mapState, mapGetters } from 'vuex';
import $ from "jquery";
import linechart_vegaVue from './linechart_vega.vue';
import { autoMaxBins } from 'vega-lite/build/src/bin';
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
                color:['#35c17c','#af7eff']
              },
              id:this.id,
              data:this.$store.state.weatherData.lineData
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
      refreshData: state => state.chartChange,
    }),
      ...mapGetters({
        storeBaseData: "getPropsData",
        getWeatInterlineData: "getWeatherLineData"
      })
  },
  watch:{
    storeBaseData: {
      handler(newVal) {
        console.log(newVal);
        if (newVal.id == this.id) {
         this.chart.repaint();
         this.chart.changeData(newVal.data)
        }
      },
      deep: true
    },
    getWeatInterlineData:{
      handler(newVal) {
        console.log(newVal);
          this.baseData.data = newVal;
          this.$store.commit("commitPropsData", this.baseData);
      },
      deep: true
    }

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
            that.chart.changeSize(width,height - 30);
            that.slider.repaint();
            //this.slider.changeSize(width,20);
          })
        })
  },
  methods: {
    selectChart() {
      this.$store.commit("commitPropsData", this.baseData);
    },
    initChart() {
      // 折线图
      this.chart = new G2.Chart({
        container: 'linechart_top',
        height: 310,
        width: 484,
      });

      var ds = new DataSet({
        state: {
          start: new Date('2012-01').getTime(),
          end: new Date('2012-12').getTime(),
        }
      });

      // console.log(this.data)
      var dv = ds.createView().source(this.baseData.data);
      dv.transform({
        type: "filter",
        callback: function callback(data) {
          var time = new Date(data.time).getTime();
          return time >= ds.state.start && time <= ds.state.end;
        }
      });

      this.chart.source(dv, {
        time: {
          type: 'time',
          mask: 'YYYY-MM',
        },
        range: [0, 1]

      });
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      this.chart.axis("time",{
          label:{
            textStyle:{
              fill:'#c2ccd0',
            }
          }
        });
      this.chart.axis('temperature', {
        label: {
          formatter: function formatter(val) {
            return val + '°C';
          }
        }
      });
      this.chart.line().position('time*temperature').color('city');
      this.chart.point().position('time*temperature').color('city').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      });
      this.chart.legend(false);
      this.chart.render();

      // slider
      if (this.slider != null){
        this.slider.destroy();
      }
      this.slider = new slider({
        container: "slider",
        start: ds.state.start, // 和状态量对应
        end: ds.state.end,
        xAxis: "time",
        yAxis: "temperature",
        //width: 484,
        padding:[ 20, 20, 95, 80 ],
        data:dv,
        backgroundChart: {
          type: "line",
          color: "#feeeed"
        },
        fillerStyle: {
          fill: '#145b7d',
          fillOpacity: 0.7
        },
        textStyle:{
              fill:'#c2ccd0',
            },
        scales: {
          ['${xAxis}']:{
            type:'time',
            mask:'YYYY-MM'
          }
        },
        onChange: function onChange(_ref) {
          var startValue = _ref.startValue,
            endValue = _ref.endValue;
          ds.setState("start", startValue);
          ds.setState("end", endValue);
          let data_time=[startValue,endValue]
          //Pubsub.publish("getTimeData",data_time)
        }
      })

      this.$store.commit("pushDataSetToState", {
          "name":"Linechart",
          "interaction":"controlled"
      })
      this.slider.render();

    }
  }

};
</script>




<style lang="css">
.container {
    height: 100%;
    width: 100%;
  }
.container_2 {
    height: 100%;
    width: 100%;
}
#linechart_top {
  position: relative;
    height: 80%;
    width: 100%;
}
#slider {
  position: relative;
  width: 100%;
  left: 1px;
  right: -1px;
  top: 20px;
  bottom: 0px;
  text-align: center;
}
</style>

