import Vue from 'vue'
import Vuex from 'vuex'
//import cart from './modules/cart'
//import products from './modules/products'
//import createLogger from '../../../src/plugins/logger'
import actions from "./action"
import getters from "./getter"
import mutations from "./mutation"

Vue.use(Vuex)

const state = {
  toDrawChart:'', //待绘制的图表
  chartComponentArray: [], //图表组件数组
// //bubblechart
//   bubblechart: {
//     "id": "001",
//     "category": "bubblechart", //种类
//     "container": {  //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0]
//     },
//     "meta": {
//       "title":"bubblechart",
//       "legend":false, //图示
//       "tooltip": "", //提示
//       "X_axis": {},
//       "Y_axis": {},
//       "value": {
//         "size": [],
//         "color": "red",
//         "label": {},
//         "opacity": "0.3",
//         "shape": "circle",
//         "style": {},
//       },
//     },
//     "data":[],
//     "interaction": {

//     }
//   },
// //bubble-frequency-chart
//   bubbleFrequencyChart: {
//     "id": "002",
//     "category": "bubbleFrequencyChart", //种类
//     "container": {  //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0]
//     },
//     "meta": {
//       "title":"bubbleFrequencyChart",
//       "legend": false,
//       "tooltip":"",
//       "X_axis": {},
//       "Y_axis": {},
//       "value": {
//         "size": [],
//         "color": "blue",
//         "label": {},
//         "opacity": "0.3",
//         "shape": "circle",
//         "style": {},
//       },
      
//     } ,
//     "data": [],
//     "interaction": {}
//   },
// //gaugechart
//   gaugechart: {
//     "id": "003",
//     "category": "gaugechart", //种类
//     "container": {  //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
//     },
//     "meta": {
//       "title": "gaugechart",
//       "legend": false,
//       "tooltip": "",
//       "axis": false,
//       "coor": {
//         "startAngle": "0",
//         "endAngle": "180",
//         "innerRadius":"0.75",
//         "radius": "0.8",
//       }
//     },
//     "data": [],
//     "interaction": {

//     }
//   },
// //groupbarchart
//   groupBarChart: {
//     "id": "004",
//     "category": "groupBarChart",
//     "container": { //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
      
//     },
//     "meta": {
//       "title": "groupBarChart",
//       "legend": false,
//       "tooltip": "",
//       "axis": {
//         "label": {

//         },
        
//       },
//       "coor": {
//         "startAngle": "0",
//         "endAngle": "180",
//         "innerRadius":"0.75",
//         "radius": "0.8",
//       }
//     },
//     "data": [],
//     "intercation": {

//     }
//   },
// //groupPieChart
//   groupPieChart: {
//     "id": "005",
//     "category": "groupPieChart",
//     "container": { //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
//       "forceFit": true,
      
//     },
//     "meta": {
//       "title": "groupPieChart",
//       "legend": false,
//       "tooltip": "",
//       "axis": {
//         "label": {

//         },
        
//       },
//       "facet": {
//         "fields": [],
//         "padding": 10,
//         "rowTitle": null,
//         "rows": 6,
//         "cols": 1,
//         "colTitle": null,
//         "eachView": {
//           "percent": {},
//           "group": {},
//           "coor": {},
//           "position": {}
//         }
//       }
//     },
//     "data": [],
//     "intercation": {
      
//     }
//   },
// //LineChart
//   lineChart: {
//     "id": "006",
//     "category": "LineChart", //种类
//     "container": {  //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
//     },
//     "meta": {
//       "title": "LineChart",
//       "legend": false,
//       "tooltip": "",
//       "axis": {
//         "x_axis": {
//           "label": {}
//         },
//         "y_axis": {
//           "label": {}
//         },
//       },
//       "coor": {
//         "startAngle": "0",
//         "endAngle": "180",
//         "innerRadius":"0.75",
//         "radius": "0.8",
//       },
//       "crosshairs": {
//         "type":"line"
//       },
//       "stroke": "",
//       "line": 1,
//     },
//     "data": [],
//     "interaction": {

//     }
//   },
// //mapBoxView
//   mapBoxView: {
//     "id": "007",
//     "category":"mapBoxView",
//     "container": {  //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
//     },
//     "meta": {
//       "title": "mapBoxView",
//       "type": "",
//       "source": {
//         "type": "",
//         "features":{

//         }
//       },
//       "point": {}
//     }
//   },
// //pieChart
//   pieChart: {
//     "id": "008",
//     "category": "pieChart",
//     "container": { //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
      
//     },
//     "meta": {
//       "title": "pieChart",
//       "legend": false,
//       "tooltip": "",
//       "axis": false,
//       "percent": {

//       },
//       "coor": "",
//       "label": {

//       }
//     },
//     "data": [],
//     "intercation": {

//     }
//   },
// //radarChart
//   radarChart: {
//     "id": "009",
//     "category": "radarChart",
//     "container": { //布局
//       "height": "100",
//       "width": "100",
//       "padding": [0,0,0,0],
      
//     },
//     "meta": {
//       "title": "radarChart",
//       "legend": false,
//       "tooltip": "",
//       "transform": {
//         "type": "",
//         "fields": [],
//         "key": "",
//         "value": "",
//       },
//       "score": {
//         "min": 0,
//         "max": 100,
//       },
//       "coor": {

//       },
//       "axis": {
//         "x_axis": {
//           "line": "",
//           "tickline": "",
//           "grid": {
          
//           }
//         },
//         "y_axis":{
//           "line": "",
//           "tickline": "",
//           "grid": {
          
//           }
//         }
//       },
//       "lineWidth": 1,
//       "fillOpacity": 1

//     }
//   },
// //ratioChart
// ratiochart: {
//   "id": "010",
//   "category": "ratioChart", //种类
//   "container": {  //布局
//     "height": "100",
//     "width": "100",
//     "padding": [0,0,0,0],
//   },
//   "meta": {
//     "title": "ratioChart",
//     "legend": false,
//     "tooltip": "",
//     "axis": {
//       "label": {

//       }
//     },
//     "percent": {}
//   },
//   "data": [],
//   "interaction": {

//   }
// },

/** demo
 * linechart example
option = {
  "id": "id1",
  "style": {
      "width": "200px",
      "height": "200px",
      "color": "orange",
      ...
  },
  "data": [[1,2],[1,2],[1,2],[1,2]],
  "meta": {
      //enhenced understanding information
      "title": "linechart",
      "legend": "",
      ...
  },
  "api": {
      //interaction
      "acceptable": {
          "x": limit,
          "y": limit
      },
      "available": {
          "x": limit,
          "y": limit
      }
  }
  ...
}
 */

chartCategory: ['bubblechart','bubbleFrequencyChart','gaugechart','groupBarChart','groupPieChart','lineChart','mapBoxView','pieChart','radarChart','ratiochart'], //图表中类数组
}

export default new Vuex.Store({
  modules: {
    state,
    mutations,
    actions,
    getters,
    //cart,
    //products
  }
}) 