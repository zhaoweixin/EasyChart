export default {
    increment(state, payload) {
        state.count += payload.step || 1;
    }
}