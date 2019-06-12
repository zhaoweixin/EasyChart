<template>

  <div v-bind:id="id" class='container' @click="selectChart">
    <div v-bind:id="g2id" class='container'></div>
    </div>
</template>

<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
var elementResizeDetectorMaker = require("element-resize-detector")
import G2 from "@antv/g2";
import { mapState,mapGetters } from 'vuex';
import $ from "jquery";

var datamapper = [
  {
    Fieldname: "name",
    Fieldtype: "string",
    Mapfrom: null,
    Alias: null
  }
];
export default {
  name: "pieChart",
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
              data : [{
                "item":"高血压","count":3228,"percent":0.13568726355611602
              },{
                "item":"糖尿病","count":880,"percent":0.036990332072299285
              },{
                "item":"老人","count":16376,"percent":0.6883564522908785
              },{
                "item":"残疾人","count":190,"percent":0.007986548970155528
              },{
                "item":"儿童","count":2765,"percent":0.11622530474989491
              },{
                "item":"精神病","count":351,"percent":0.014754098360655738
              }],
              datamappers: datamapper,
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
    ...mapGetters({ storeBaseData: "getPropsData",
      getWeatPieData:"getWeatherPrData"
    }),
    dataMap(){
      return this.storeBaseData.datamappers
    },
  },
  watch: {
    'refreshData': {
      deep:true,
      handler() {
        //this.chart.changeSize(this.$store.state.chartSizeChange.newWidth,this.$store.state.chartSizeChange.newHeight);
        console.log("更改了wh")
      }
    },
    storeBaseData:{
      handler(newVal){
        console.log(newVal)
      },
      deep:true
    },
    getWeatPieData:{
      handler(newVal){
        this.baseData.data = newVal;
        this.$store.commit("commitPropsData", this.baseData);
      },
      deep:true
    },
    dataMap:{
      handler(newVal){

        console.log(newVal)
        this.baseData.datamappers = newVal
        if (newVal[0].Alias != null){
          this.$store.commit("commitPieData",newVal[0].Alias)
        }
      },
      deep:true
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
        })

      //点击交互
      this.chart.on('click', ev=> {


        if ( typeof ev.data!='undefined'?true :false) {
          const data =ev.data._origin;
          this.$store.commit("commitInteracBarData", data.item)
          this.$store.commit("commitInteracCanlendarData", data.item)
          this.$store.commit("commitInteracScatterData", data.item)
        }else {
          this.$store.commit("commitZongWeatherData",1)
        };
      });
      this.chart.render()

      this.$store.commit("pushDataSetToState", {
          "name":"Piechart",
          "interaction":"controlled"
      })
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




