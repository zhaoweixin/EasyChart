export default {
    someLists: state => param => {
        return state.someLists.filter(() => param.done)
    },
    

}