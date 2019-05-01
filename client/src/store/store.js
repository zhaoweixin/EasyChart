import Vue from 'vue'
import Vuex from 'vuex'
//import cart from './modules/cart'
//import products from './modules/products'
//import createLogger from '../../../src/plugins/logger'
import actions from "./action"
import getters from "./getter"
import mutations from "./mutation"

Vue.use(Vuex)

const state = {
  count: 0,
  someLists: []
}

export default new Vuex.Store({
  modules: {
    state,
    mutations,
    actions,
    getters
    //cart,
    //products
  }
})