const mutation = {
    increment(state, payload) {
        state.count += payload.step || 1;
    },
    createChartComponet(state,chartobj){
        state.chartComponetArray.push(chartobj);
    },
    toDrawChart(state, payload){
        state.toDrawChart = payload.toDrawChart;
    },
    setChartLayer(state, payload){
        state.chartLayer = payload.chartLayer
    },
    setChartXY(state, payload){
        state.chartX = payload.x;
        state.chartY = payload.y;
    },
    pushDataSetToState(state, dataset) {
        //state.chartComponetArray.push(dataset);
        //state.charttest = dataset;
        state.chartComponentArray.push(dataset);
    },
    addIdToArray(state, id) {
        state.chartIdArray.push(id);
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
    commitChange(state, payload){
        state.chartSizeChange = payload;
    },
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
  commitWeatherData(state,payload){
    state.weatherData.baseData=payload
    state.weatherData.barData = Data(payload,"bar")
    state.weatherData.pieData = Data(payload,"pie")
    state.weatherData.canlenderData = Data(payload,"canlender")
    state.weatherData.pointData = Data(payload,"point")

    console.log(state.weatherData)
  },
  commitInteractionData(state,payload){
    state.weatherData.barData = {data:interationData(state.weatherData.baseData,"bar" ,payload),
      change:interationData(state.weatherData.baseData,"bar" ,payload).length/40}
    console.log(state.weatherData.barData)
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
      console.log(state.interactionData)
  }
}

export default mutation

//init 天气数据
function Data(payload,type) {
let arr_bar = [];
  let  arr_pie = [],arrpie=[];
let arr_canlender = [];
let arr_point = []
  for (let i=0;i<payload.length;i++){
    if (payload[i].date.indexOf("2012")>-1) {
      arr_bar.push(   //柱状图
        {
          name:payload[i].date,
          value:payload[i].precipitation
        }
      )
      arrpie.push(payload[i].weather) //圆环
      arr_canlender.push([payload[i].date,payload[i].precipitation])   //日历图数据
      arr_point.push(  //散点数据
        {
          name:payload[i].date,
          value:payload[i].wind
        }
      )
    }else {
      break
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
    case 'point':return arr_canlender;
  }
}

function interationData(payload,type,factor) {
  let arr_bar = [];
  let  arr_pie = [],arrpie=[];
  let arr_canlender = [];
  let arr_point = []
  for (let i=0;i<payload.length;i++){
    if ((payload[i].date.indexOf("2012")>-1)&&(payload[i].weather==factor)) {
      arr_bar.push(   //柱状图
        {
          name:payload[i].date,
          value:payload[i].precipitation
        }
      )
      arrpie.push(payload[i].weather) //圆环
      arr_canlender.push([payload[i].date,payload[i].precipitation])   //日历图数据
      arr_point.push(  //散点数据
        {
          name:payload[i].date,
          value:payload[i].wind
        }
      )
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
    case 'point':return arr_canlender;
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
