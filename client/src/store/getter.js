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
<<<<<<< HEAD
    },
  getPropsData: state => {    //野
    return state.propsData
  }
=======
    }
>>>>>>> c847ce60e6c39c430ebdc670a8d120a07b52a48b
}

export default getter
