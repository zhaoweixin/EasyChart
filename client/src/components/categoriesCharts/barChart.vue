<template>
  <div v-bind:id="id" class="container" @click="selectChart"></div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
import { mapGetters } from "vuex";
import echarts from "echarts";
var datamapper = [
  {
    dataname: "value",
    datatype: "num",
    mapfrom: null,
    alias: null
  },
  {
    dataname: "name",
    datatype: "string",
    mapfrom: null,
    alias: null
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
          data: [
            { name: "Mon", value: "10" },
            { name: "Tue", value: "706" },
            {
              name: "Wed",
              value: "239"
            },
            { name: "Thu", value: 172 }
          ] ,
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
    ...mapGetters({ storeBaseData: "getPropsData" }),
    ...mapGetters({getInterData:"getInteractionData"}),

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
            name: "直接访问",
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
    getInterData:{
      handler(newVal){
        this.baseData.data=newVal
        this.$store.commit("commitPropsData", this.baseData);
      },
      deep:true
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
