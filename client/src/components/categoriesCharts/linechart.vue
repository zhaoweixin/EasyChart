<template>

  <div v-bind:id="id" class='container' @click="selectChart">

  </div>

</template>


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
                "month": "Jan",
                "city": "Tokyo",
                "temperature": 7
            }, {
                "month": "Jan",
                "city": "London",
                "temperature": 3.9
            }, {
                "month": "Feb",
                "city": "Tokyo",
                "temperature": 6.9
            }, {
                "month": "Feb",
                "city": "London",
                "temperature": 4.2
            }, {
                "month": "Mar",
                "city": "Tokyo",
                "temperature": 9.5
            }, {
                "month": "Mar",
                "city": "London",
                "temperature": 5.7
            }, {
                "month": "Apr",
                "city": "Tokyo",
                "temperature": 14.5
            }, {
                "month": "Apr",
                "city": "London",
                "temperature": 8.5
            }, {
                "month": "May",
                "city": "Tokyo",
                "temperature": 18.4
            }, {
                "month": "May",
                "city": "London",
                "temperature": 11.9
            }, {
                "month": "Jun",
                "city": "Tokyo",
                "temperature": 21.5
            }, {
                "month": "Jun",
                "city": "London",
                "temperature": 15.2
            }, {
                "month": "Jul",
                "city": "Tokyo",
                "temperature": 25.2
            }, {
                "month": "Jul",
                "city": "London",
                "temperature": 17
            }, {
                "month": "Aug",
                "city": "Tokyo",
                "temperature": 26.5
            }, {
                "month": "Aug",
                "city": "London",
                "temperature": 16.6
            }, {
                "month": "Sep",
                "city": "Tokyo",
                "temperature": 23.3
            }, {
                "month": "Sep",
                "city": "London",
                "temperature": 14.2
            }, {
                "month": "Oct",
                "city": "Tokyo",
                "temperature": 18.3
            }, {
                "month": "Oct",
                "city": "London",
                "temperature": 10.3
            }, {
                "month": "Nov",
                "city": "Tokyo",
                "temperature": 13.9
            }, {
                "month": "Nov",
                "city": "London",
                "temperature": 6.6
            }, {
                "month": "Dec",
                "city": "Tokyo",
                "temperature": 9.6
            }, {
                "month": "Dec",
                "city": "London",
                "temperature": 4.8
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
      refreshData: state => state.chartChange,
    })
  },
  mounted() {
    this.initChart();
  },
  methods: {
    selectChart() {
      this.$store.commit("commitPropsData", this.baseData);
    },
    initChart() {
      this.chart = new G2.Chart({
        container: this.id,
        width: 484,
        height: 310,
      });
      this.chart.source(this.baseData.data, {
        month: {
          range: [0, 1]
        }
      });
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      this.chart.axis('temperature', {
        label: {
          formatter: function formatter(val) {
            return val + '°C';
          }
        }
      });
      this.chart.line().position('month*temperature').color('city');
      this.chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      });
      this.chart.render();
    },

  }
  
};
</script>






    