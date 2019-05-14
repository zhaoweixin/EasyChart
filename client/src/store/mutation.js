export default {
    increment(state, payload) {
        state.count += payload.step || 1;
    },
    createChartComponet(state){
        state.chartComponetArray.push();
    }
}