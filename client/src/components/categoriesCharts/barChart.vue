<template>
  <div v-bind:id="id" class="container"></div>
</template>

<script>
import store from "../../store/store";
import Dataconfig from "../../store/dataconfig.js";
var elementResizeDetectorMaker = require("element-resize-detector");
import { mapState, mapGetters } from "vuex";
import echarts from "echarts";
import defaultData from "../../assets/baseData";
// console.log(defaultData.barChart.baseData)
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

var select_config = {
  "controller":'Barchart',
  "controllee":["Canlendar"],
  'action':'filter',
  'data':'weather',
  'fieldname':'date'
}
export default {
  name: "Barchart",
  props: {
    id: String
    // baseData: {
    //   "type": Object,
    //   "default": function() {
    //     let a = {
    //       metaConfig: {
    //         title: "降雨量"
    //       },
    //       "style": {
    //         color: ["#69C0FF"]
    //       },
    //       id: this.id,
    //       data: [
    //         { name: "Mon", value: "10" },
    //         { name: "Tue", value: "706" },
    //         {
    //           name: "Wed",
    //           value: "239"
    //         },
    //         { name: "Thu", value: 172 }
    //       ],
    //       datamappers: datamapper,
    //       button: {
    //         method: "startanalyzedata",
    //         title: "Apply"
    //       }
    //     };
    //     return a;
    //   }
    // }
  },
  data() {
    return {
      name: "Barchart",
      myChart: null,
      option: null,
      baseData: defaultData.barChart.baseData
    };
  },
  computed: {
    ...mapGetters({
      getWeatInterData: "getWeatherBarData"
    }),
    // dataMap(){
    //   return this.storeBaseData
    // },

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
            data: this.comArray(this.baseData.data, Dataconfig.barxname),
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
            data: this.comArray(this.baseData.data, Dataconfig.baryname)
          }
        ]
      };
    }
  },
  methods: {
    draw() {
      this.myChart = echarts.init(document.getElementById(this.id));
      this.myChart.setOption(this.t);
      this.$store.commit("pushDataSetToState", {
        name: "Barchart",
        interaction: "controler"
      });
      this.myChart.on('click', (d)=>{

        console.log(this.baseData.datamappers)
        if (select_config.controller==this.name) {
          for (let i=0;i<select_config.controllee.length;i++){
            let inter_chart = select_config.controllee[i]
            select_config.fieldname = this.baseData.datamappers[1].Alias    //字段名
            select_config.select_data =d.name
            this.$store.commit("commitInterac"+inter_chart+"Data", select_config)

          }
        }
      })
    },
    reDraw(newVal) {
      // console.log("进入到子组件来了")
      // console.log(newVal)
      this.myChart.setOption({
        title: {
          text: newVal.metaConfig.title
        },
        color: newVal.style.color,
        xAxis: [
          {
            data: this.comArray(newVal.data, Dataconfig.barxname)
          }
        ],
        series: {
          name: Dataconfig.dataname,
          data: this.comArray(newVal.data, Dataconfig.baryname)
        }
      });
      // echarts.init(document.getElementById(this.id)).resize();
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
    getInterData: {
      handler(newVal) {
        // this.baseData.data = newVal;
        // this.$store.commit("commitPropsData", this.baseData);
      },
      deep: true
    },
    getWeatInterData: {
      handler(newVal) {
        this.baseData.data = newVal;
        this.$store.commit("commitPropsData", this.baseData);
      },
      deep: true
    },
    dataMap: {
      handler(newVal) {
        if (newVal.id == this.id) {
          if (newVal.datamappers === undefined) {
            this.baseData.datamappers = datamapper;
          } else {
            this.baseData.datamappers = newVal.datamappers;
          }

          if (
            newVal.datamappers[0].Alias != null &&
            newVal.datamappers[1].Alias != null
          ) {
            let a = [newVal.datamappers[0].Alias, newVal.datamappers[1].Alias];
            this.$store.commit("commitDataMapper", a);
          }
        }
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
