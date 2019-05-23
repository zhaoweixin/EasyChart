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
    }
}

export default mutation