<template>

  <div v-bind:id="id" class='container' @click="selectChart">
    <div id="linechart_top"></div>
    <div id="slider"></div>
  </div>

</template>


<script>
import G2 from "@antv/g2";
const slider = require("@antv/g2-plugin-slider");
import { DataSet } from "@antv/data-set";
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
                "time":"2016-01-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-01-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-02-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-02-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-03-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-03-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-04-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-04-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-05-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-05-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-06-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-06-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-07-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-07-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-08-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-08-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-09-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-09-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-10-01","签约人群":"总签约人数","签约人数":0
                },{"time":"2016-10-01","签约人群":"重点签约人数","签约人数":0
                },{"time":"2016-11-01","签约人群":"总签约人数","签约人数":3
                },{"time":"2016-11-01","签约人群":"重点签约人数","签约人数":1
                },{"time":"2016-12-01","签约人群":"总签约人数","签约人数":4
                },{"time":"2016-12-01","签约人群":"重点签约人数","签约人数":3
                },{"time":"2017-01-01","签约人群":"总签约人数","签约人数":16
                },{"time":"2017-01-01","签约人群":"重点签约人数","签约人数":16
                },{"time":"2017-02-01","签约人群":"总签约人数","签约人数":250
                },{"time":"2017-02-01","签约人群":"重点签约人数","签约人数":249
                },{"time":"2017-03-01","签约人群":"总签约人数","签约人数":342
                },{"time":"2017-03-01","签约人群":"重点签约人数","签约人数":339
                },{"time":"2017-04-01","签约人群":"总签约人数","签约人数":188
                },{"time":"2017-04-01","签约人群":"重点签约人数","签约人数":188
                },{"time":"2017-05-01","签约人群":"总签约人数","签约人数":3
                },{"time":"2017-05-01","签约人群":"重点签约人数","签约人数":2
                },{"time":"2017-06-01","签约人群":"总签约人数","签约人数":2119
                },{"time":"2017-06-01","签约人群":"重点签约人数","签约人数":926
                },{"time":"2017-07-01","签约人群":"总签约人数","签约人数":15921
                },{"time":"2017-07-01","签约人群":"重点签约人数","签约人数":5454
                },{"time":"2017-08-01","签约人群":"总签约人数","签约人数":9047
                },{"time":"2017-08-01","签约人群":"重点签约人数","签约人数":3042
                },{"time":"2017-09-01","签约人群":"总签约人数","签约人数":7203
                },{"time":"2017-09-01","签约人群":"重点签约人数","签约人数":3356
                },{"time":"2017-10-01","签约人群":"总签约人数","签约人数":31633
                },{"time":"2017-10-01","签约人群":"重点签约人数","签约人数":11891
                },{"time":"2017-11-01","签约人群":"总签约人数","签约人数":76973
                },{"time":"2017-11-01","签约人群":"重点签约人数","签约人数":24889
                },{"time":"2017-12-01","签约人群":"总签约人数","签约人数":36357
                },{"time":"2017-12-01","签约人群":"重点签约人数","签约人数":13142
                },{"time":"2018-01-01","签约人群":"总签约人数","签约人数":5244
                },{"time":"2018-01-01","签约人群":"重点签约人数","签约人数":2315
                },{"time":"2018-02-01","签约人群":"总签约人数","签约人数":43280
                },{"time":"2018-02-01","签约人群":"重点签约人数","签约人数":22350
                },{"time":"2018-03-01","签约人群":"总签约人数","签约人数":79382
                },{"time":"2018-03-01","签约人群":"重点签约人数","签约人数":38555
                },{"time":"2018-04-01","签约人群":"总签约人数","签约人数":75383
                },{"time":"2018-04-01","签约人群":"重点签约人数","签约人数":37424
                },{"time":"2018-05-01","签约人群":"总签约人数","签约人数":72234
                },{"time":"2018-05-01","签约人群":"重点签约人数","签约人数":30401
                },{"time":"2018-06-01","签约人群":"总签约人数","签约人数":71267
                },{"time":"2018-06-01","签约人群":"重点签约人数","签约人数":28115
                },{"time":"2018-07-01","签约人群":"总签约人数","签约人数":157487
                },{"time":"2018-07-01","签约人群":"重点签约人数","签约人数":76366
                },{"time":"2018-08-01","签约人群":"总签约人数","签约人数":83563
                },{"time":"2018-08-01","签约人群":"重点签约人数","签约人数":38653
                },{"time":"2018-09-01","签约人群":"总签约人数","签约人数":40644
                },{"time":"2018-09-01","签约人群":"重点签约人数","签约人数":14774
                },{"time":"2018-10-01","签约人群":"总签约人数","签约人数":38981
                },{"time":"2018-10-01","签约人群":"重点签约人数","签约人数":12559
                },{"time":"2018-11-01","签约人群":"总签约人数","签约人数":90184
                },{"time":"2018-11-01","签约人群":"重点签约人数","签约人数":22146
                },{"time":"2018-12-01","签约人群":"总签约人数","签约人数":"__vue_devtool_undefined__"
                },{"time":"2018-12-01","签约人群":"重点签约人数","签约人数":"__vue_devtool_undefined__"
                }]
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
        container: 'linechart_top',
        width: 484,
        height: 310,
      });

      var ds = new DataSet({
        state: {
          start: new Date('2016-01-01').getTime(),
          end: new Date('2018-12-01').getTime(),
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
        this.chart.tooltip({
          crosshairs: {
            type: "line"
          }
        });
        this.chart.axis("签约人数", {
          label: {
            formatter: function formatter(val) {
              return val + "人";
            },
            line: {
              stroke: "white"
            },
            textStyle :{
              fill:'#c2ccd0',
            }
          }
        });
        this.chart.axis("time",{
          label:{
            textStyle:{
              fill:'#c2ccd0',
            }
          }
        });

        // this.chart.scale("签约人数", {
        //   type: "pow"
        // });
        this.chart.source(dv, {
          time: {
            type: 'time',
            mask:'YYYY-MM'
          },
          range: [0, 1]
        });
      this.chart.area().position('time*签约人数')
      .color('签约人群')
      .shape('smooth');

      this.chart
          .line()
          .position("time*签约人数")
          .color("签约人群")
          .shape("smooth");
        this.chart
          .point()
          .position("time*签约人数")
          .color("签约人群")
          .size(4)
          .shape("line")
          .style({
            stroke: "#fff",
            lineWidth: 2
          });
        this.chart.legend({
          position:'top'
        });
        this.chart.render();
        // 创建 Slider


      //console.log(this.slider)

      if (this.slider != null){
        this.slider.destroy();
      }
      this.slider = new slider({
        container: "slider",
        start: ds.state.start, // 和状态量对应
        end: ds.state.end,
        xAxis: "time",
        yAxis: "签约人数",
        width: 484,
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
      this.slider.render();
    },

  }
  
};
</script>






    