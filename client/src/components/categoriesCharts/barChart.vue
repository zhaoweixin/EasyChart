<template>
  <div v-bind:id="id" class="container" @click="selectChart"></div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
import {mapState, mapGetters } from "vuex";
import echarts from "echarts";

var datamapper = [
  {
    Fieldname: "value",
    Fieldtype: "num",
    Mapfrom: null,
    Alias: null
  },
  {
    Fieldname: "name",
    Fieldtype: "string",
    Mapfrom: null,
    Alias: null
  }
];
export default {
  name: "LiZi",
  props: {
    id: String,
    baseData: {
      type: Object,
      default: function() {
        let a = {
          metaConfig: {
            title: "柱图"
          },
          style: {
            color: ["#69C0FF"]
          },
          id: this.id,
          data: this.$store.state.weatherData.barData,
          datamappers: datamapper
        };
        return a;
      }
    }
  },
  data() {
    return {
      myChart: null,
      option: null
    };
  },
  computed: {
    ...mapGetters({ storeBaseData: "getPropsData" ,
      getWeatInterData: "getWeatherInterData"
    }),
    t() {
      return {
        color: this.baseData.style.color,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: this.baseData.metaConfig.title
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.comArray(this.baseData.data, "name"),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "降雨量",
            type: "bar",
            barWidth: "60%",
            data: this.comArray(this.baseData.data, "value")
          }
        ]
      };
    }
  },
  methods: {

    selectChart() {
      this.$store.commit("commitPropsData", this.baseData);
    },
    draw() {
      this.myChart = echarts.init(document.getElementById(this.id));
      this.myChart.setOption(this.t);
    },
    comArray(data, name) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        // console.log(data.name)
        arr.push(data[i][name]);
      }
      return arr;
    }
},
  mounted() {
    this.draw();
    console.log(this.getWeatInterData);
    var erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById(this.id), element => {
      var width = element.offsetWidth;
      var height = element.offsetHeight;
      this.$nextTick(function() {
        //使echarts尺寸重置
        echarts.init(document.getElementById(this.id)).resize();
      });
    });
  },
  watch: {
    //野
    storeBaseData: {
      handler(newVal) {
        console.log(this.getWeatInterData)
        if (newVal.id == this.id) {
          this.myChart.setOption({
            title: {
              text: newVal.metaConfig.title
            },
            color: newVal.style.color,
            xAxis: [
              {
                data: this.comArray(newVal.data, "name")
              }
            ],
            series: {
              data: this.comArray(newVal.data, "value")
            }
          });
        }
      },
      deep: true
    },
    getInterData: {
      handler(newVal) {

        console.log("dd")
        // this.baseData.data = newVal;
        // this.$store.commit("commitPropsData", this.baseData);
      },
      deep: true
    },
    getWeatInterData:{
      handler(){
        console.log("dddddd")
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  /* border: 3px solid black; */
}
</style>
