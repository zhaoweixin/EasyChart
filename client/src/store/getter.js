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

  getWeatherInterData: state => {
    return state.weatherData.barData
  },
  getInteractionData:state=>{
      return state.interactionData
  },
  // getBarData:state=>{
  //     return state.barData
  // }
}

export default getter
