const getter = {
    someLists: state => param => {
        return state.someLists.filter(() => param.done)
    },
    getChartXY: state => {
        return {"x": state.chartX, "y": state.chartY}
    }
}

export default getter