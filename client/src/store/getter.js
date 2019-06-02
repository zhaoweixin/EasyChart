const getter = {
    someLists: state => param => {
        return state.someLists.filter(() => param.done)
    },
    getChartXY: state => {
        return {"x": state.chartX, "y": state.chartY}
    },
    chartArray:state => {
        return state.chartIdArray
    },
    layout:state =>{
        return state.rects
    },
    dashboardId: state=>{
        return state.dashboardId
    }
}

export default getter