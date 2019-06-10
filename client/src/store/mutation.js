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
    },

  InteractionData(state,payload){
      if (payload==0){

        state.interactionData=[]
      } else{
        let isHave = state.interactionData.indexOf(payload)>-1
        if (!isHave){
          state.interactionData.push(payload)
        }
      }

  }
}

export default mutation
