export default {
    increment(state, payload) {
        state.count += payload.step || 1;
    },
    createChartComponet(state,chartobj){
        state.chartComponetArray.push(chartobj);
    },
    changeToDrawChart(state, payload){
        console.log(payload);
        state.toDrawChart = payload;
    }
}