import Vue from 'vue'
import Vuex from 'vuex'
import http from './http'
import home from './home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    http,
    home
  }
})
