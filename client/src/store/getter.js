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
    },
    rSideData: state=>{
        return state.rSideData
    },
  getPropsData: state => {    //野
    return state.propsData
  },
  // getBarData:state=>{
  //     return state.barData
  // }
}

export default getter
