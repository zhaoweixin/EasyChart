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
    // 提交更改视图的类型
    commitChange(state, payload){
        state.chartChange = payload;
    },
    commitDashboardId(state,payload){
        state.dashboardId = payload;
    },
    commitIsActive(state,payload){
        state.isActive = payload;
    },
  commitPropsData(state,payload){
      state.propsData = payload
    console.log(payload)
  },
//   changeActive(state,payload){
//       state.isActive = payload
//   }
}

export default mutation
