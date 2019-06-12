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
    getIsActive: state=>{
        return state.isActive
    },
  getPropsData: state => {    //野
    return state.propsData
  },

  getWeatherBarData: state => {
    return state.interacBarData
  },
  getWeatherCanlendarData: state => {
    return state.interacCanlendarData
  },
  getWeatherScatterData: state => {
    return state.interacScatterData
  },
  getInteractionData:state=>{
      return state.interactionData
  },
  getChartComponentArray: state=>{
      return state.chartComponentArray
  }
  // getBarData:state=>{
  //     return state.barData
  // }
}

export default getter
