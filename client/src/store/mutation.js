var interactive_config =require('../assets/interactive.json');


console.log(interactive_config)

const mutation = {
    increment(state, payload) {
        state.count += payload.step || 1;
    },
    createChartComponet(state,chartobj){
        state.chartComponetArray.push(chartobj);
    },
    setChartLayer(state, payload){
        state.chartLayer = payload.chartLayer
    },
    pushDataSetToState(state, dataset) {
        state.chartComponentArray.push(dataset);
    },
    addIdToArray(state, id) {
        state.chartIdArray.push(id);
    },
    pushDataToArray(state, payload) {
        state.chartArray[payload.i] = payload;
    },
    changeSelectId(state, payload) {
        state.selectChartId = payload;
    },
    // 右侧栏提交改变的数据
    reChartData(state, payload) {
        state.chartComponentArray[parseInt(payload.id)-1] = payload;
            console.log("修改成功")
    },
    editInteraction(state, payload){
        state.popUp = !state.popUp
    },
    // 提交更改视图的类型
    // commitChange(state, payload){
    //     state.chartSizeChange = payload;
    // },
    commitDashboardId(state,payload){
        state.dashboardId = payload;
    },
    commitIsActive(state,payload){
        state.isActive = payload;
    },
    commitPropsData(state,payload){
      state.propsData = payload
    },
    updateDataMapper(state,payload){
        state.dataMapper = JSON.parse(JSON.stringify(payload))
    },

  //天气数据
  commitWeatherData(state,payload){
    state.weatherData.baseData=payload
    state.weatherData.barData = Data(payload,"bar")
    state.weatherData.pieData = Data(payload,"pie")
    state.weatherData.canlenderData = Data(payload,"canlender")
    state.weatherData.pointData = Data(payload,"point")
    state.weatherData.lineData = Data(payload,"line")

    // console.log(state.weatherData.lineData)
  },

  //根据payload过滤天气数据
  commitInteracBarData(state,payload){

    console.log(payload)
    for (let i=0;i<interactive_config.length;i++){
      if (payload.controller==interactive_config[i].controller){
        for (let j=0;j<payload.controllee.length;j++){
          let interact_chart_data = payload.controllee[j].replace('chart','')

          state["interac"+interact_chart_data+"Data"] =interationData(state.weatherData.baseData,
            interact_chart_data.toLowerCase() ,payload.select_data)
        }
      }
    }

    // state.interacBarData =interationData(state.weatherData.baseData,"bar" ,payload)
  },
  commitInteracCanlendarData(state,payload){
    for (let i=0;i<interactive_config.length;i++) {
      if (payload.controller == interactive_config[i].controller) {
        for (let j = 0; j < payload.controllee.length; j++) {
          let interact_chart_data = payload.controllee[j]
          state["interac"+interact_chart_data+"Data"] =interationData(state.weatherData.baseData,
            interact_chart_data.toLowerCase() ,payload)
        }
      }
    }
    //   console.log(payload)
    // state.interacCanlendarData =interationData(state.weatherData.baseData,"canlender" ,payload)

  },
  commitInteracScatterData(state,payload){
    state.interacScatterData =interationData(state.weatherData.baseData,"point" ,payload)
  },

  commitInteracWeatherData(state,payload){
    for (let i=0;i<interactive_config.length;i++) {
      if (payload.controller == interactive_config[i].controller) {
          let interact_chart_data = payload.controllee[payload.index]
          if (interact_chart_data.indexOf('chart')>-1){
            interact_chart_data=interact_chart_data.replace('chart','')
          }
          console.log(state["interac"+interact_chart_data+"Data"] =interationData(state.weatherData.baseData,
            interact_chart_data.toLowerCase() ,payload))
        }
    }
  },
  commitInteracLineData(state,payload){
      state.interacLineData =interationData(state.weatherData.baseData,"line" ,payload)
  },
  commitZongWeatherData(state,payload){
    state.interacBarData = state.weatherData.barData
    state.interacCanlendarData =  state.weatherData.canlenderData
    state.interacScatterData = state.weatherData.pointData
    state.interacLineData = state.weatherData.lineData

    console.log('ddd')
  },

  commitDataMapper(state,payload){
      console.log(payload)
      if (payload[0]=='precipitation'&&payload[1]=='date') {
        state.interacBarData = state.weatherData.barData
      }
  },
  commitPieData(state,payload){
    if (payload == 'weather') {
      state.interacPieData =state.weatherData.pieData
    }
  },

  InteractionData(state,payload){
      if (payload==0){
        state.interactionData=[]
      } else{
        let isHave = state.interactionData.some(item=>{
          if (item.name==payload.name){
            return true
          }
        })
        if (!isHave){
          state.interactionData.push(payload)
        }
      }
  },
  changeStatic(state,payload){
    console.log(payload.value)
    console.log(payload.value%2==1)
    if(payload.value%2==1){
      state.chartArray[payload.index].static = true;
    }
    else{
      state.chartArray[payload.index].static = false;
    }
  }
}

export default mutation

//init 天气数据
function Data(payload,type) {
let arr_bar = [];
  let  arr_pie = [],arrpie=[];
let arr_canlender = [];
let arr_point = []
  let arr_line = []
  for (let i=0;i<payload.length;i++){
    if (payload[i].date.indexOf("2012")>-1) {
      arr_bar.push(   //柱状图
        {
          name:payload[i].date,
          value:payload[i].precipitation
        }
      )
      arrpie.push(payload[i].weather) //圆环
      arr_canlender.push([payload[i].date,payload[i].temp_max])   //日历图数据
      arr_point.push(  //散点数据
        {
          x:payload[i].date,
          y:payload[i].wind
        }
      )
      arr_line.push({
        'time':payload[i].date,
        'city':'max',
        'temperature':parseInt(payload[i].temp_max)
      },
        {
          'time':payload[i].date,
          'city':'min',
          'temperature':parseInt(payload[i].temp_min)
        })
    }
  }
  let a =can_data(arrpie)

  for (let i=0;i<a.length;i++){
    arr_pie.push({
      "item":a[i][0],
      "count":a[i][1],
      "percent":a[i][1]/payload.length
    })
  }
  switch (type){
    case 'bar':return arr_bar;
    case 'pie':return arr_pie;
    case 'canlender':return arr_canlender;
    case 'point':return arr_point;
    case 'line':return arr_line
  }
}

function interationData(payload,type,factor) {
  let arr_bar = [];
  let  arr_pie = [],arrpie=[];
  let arr_canlender = [];
  let arr_point = []
  let arr_line = []
  for (let i=0;i<payload.length;i++){
    //
    // console.log(payload[i][factor.fieldname])
    // console.log(factor.select_data)
    if ((payload[i].date.indexOf("2012")>-1)&&
      (payload[i][factor.fieldname]==factor.select_data)) {    //控制字段名和选择的值
      arr_bar.push(   //柱状图
        {
          name:payload[i].date,
          value:payload[i].precipitation
        }
      )
      arrpie.push(payload[i].weather) //圆环
      arr_canlender.push([payload[i].date,
        payload[i].precipitation])   //日历图数据   降水量

      arr_point.push(  //散点数据
        {
          x:payload[i].date,
          y:payload[i].wind
        }
      )
      arr_line.push({
          'time':payload[i].date,
          'city':'max',
          'temperature':parseInt(payload[i].temp_max)
        },
        {
          'time':payload[i].date,
          'city':'min',
          'temperature':parseInt(payload[i].temp_min)
        })
    }
  }
  let a =can_data(arrpie)

  for (let i=0;i<a.length;i++){
    arr_pie.push({
      "item":a[i][0],
      "count":a[i][1],
      "percent":a[i][1]/payload.length
    })
  }


  console.log(arr_canlender)

  console.log(arr_line)
  switch (type){
    case 'bar':return arr_bar;
    case 'pie':return arr_pie;
    case 'canlendar':return arr_canlender;
    case 'point':return arr_point;
    case 'line':return arr_line
  }
}

//单个数组合并重复项成二维数组
function can_data(_arr){
  var _res = []; //
  _arr.sort();
  for (var i = 0; i < _arr.length;) {
    var count = 0;
    for (var j = i; j < _arr.length; j++) {
      if (_arr[i] == _arr[j]) {
        count++;
      }
    }
    _res.push([_arr[i], count]);
    i += count;
  }
  //_res 二维数维中保存了 值和值的重复数
  return _res;
}
