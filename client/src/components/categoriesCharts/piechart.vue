<template>

  <div v-bind:id="id" class='container' @click="selectChart">
  </div>
</template>

<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from "@antv/g2";
import { mapState } from 'vuex';
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
    };
  },
  computed: {
    ...mapState({
      chartArray: state => state.chartIdArray,
      refreshData: state => state.chartSizeChange,
    })
  },
  watch: {
    'refreshData': {
      deep:true,
      handler() {
        this.chart.changeSize(this.$store.state.chartSizeChange.newWidth,this.$store.state.chartSizeChange.newHeight);
        console.log("更改了wh")
      }
    }
  },
  mounted() {
    this.initChart();
    //this.chartInit();
  },
  methods: {
    selectChart() {
      this.$store.commit("commitPropsData", this.baseData);
    },
    initChart() {
      this.chart = new G2.Chart({
        container: this.id,
        width: 484,
        height: 310
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
      // this.chart.on('click', ev=> {
      //   const data =ev.data._origin;
      //   // data.push()
      //   let arr=[];
      //   arr=[data.item,this.city]

      //   this.$root.$emit('updataLine',arr)
      //   this.$root.$emit('updateFunnel',arr)
      //   this.$root.$emit('updateColum',arr)
      //   this.$root.$emit('updateGrp',arr)
      //   this.$root.$emit('updateBarChart',arr)

      //   Pubsub.publish("manBing",data.item)



      // });
      this.chart.render()
    },

  }
  
};
</script>






    