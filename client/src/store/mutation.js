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
        id.x = id.x + 2 * state.chartIdArray.length;
        id.i = state.chartIdArray.length;
        state.chartIdArray.push(id);
        console.log(state.chartIdArray)
        console.log("000")
    },
    // 右侧栏提交改变的数据
    reChartData(state, payload) {
        // for (var i = 0, len = state.chartComponentArray.length; i < len; i++) {
        //     if (state.chartComponentArray[i].dataset.id === payload.id) {
        //       state.chartComponentArray[i].dataset = payload.dataset
        //       break;
        //     }
        // }
        state.chartComponentArray[parseInt(payload.id)-1] = payload;
            console.log("修改成功")
    },
    // 提交更改视图的长宽
    commitChange(state, payload){
        state.chartWandHChange = payload;
        // console.log("tijiaozhixingle ")
    }
}

export default mutation