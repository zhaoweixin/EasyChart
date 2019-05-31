<template>
    <div id="bubble" >
    </div>  
      
</template>
<!--<script src="https://d3js.org/d3.v4.min.js"></script>-->
<script>
import G2 from "@antv/g2";
import { mapState } from 'vuex';
import $ from "jquery";
export default {
  name: "bubbleChart",
  // props:['bwidth'],
  data() {
    return {
      name: "test",
      sourceData: [{
            year: '1991',
            value: 3
        }, {
            year: '1992',
            value: 4
        }, {
            year: '1993',
            value: 3.5
        }, {
            year: '1994',
            value: 5
        }, {
            year: '1995',
            value: 4.9
        }, {
            year: '1996',
            value: 6
        }, {
            year: '1997',
            value: 7
        }, {
            year: '1998',
            value: 9
        }, {
            year: '1999',
            value: 13
        }],  
    };
  },
  mounted() {
    this.initChart();
    //this.chartInit();
  },
  methods: {
    initChart() {
        
  this.chart = new G2.Chart({
    container: 'mountNode',
    forceFit: true,
    height: window.innerHeight
  });
  this.chart.source(data);
  this.chart.scale('value', {
    min: 0
  });
  this.chart.scale('year', {
    range: [0, 1]
  });
  this.chart.tooltip({
    crosshairs: {
      type: 'line'
    }
  });
  this.chart.line().position('year*value');
  this.chart.point().position('year*value').size(4).shape('circle').style({
    stroke: '#fff',
    lineWidth: 1
  });
  this.chart.render();
    }
  }
  
};
</script>
