import Vue from 'vue'
import Vuex from 'vuex'
import http from './http'
import login from './login'
import home from './home'
import location from './location'
import service from './service'
import check from './check'
import order from './order'
import car from './car'
import address from './address'
import center from './center'
import consumption from './Consumption'
import balance from './balance'
import coupon from './coupon'
import dinner from './dinner'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    http,
    login,
    home,
    location,
    service,
    check,
    order,
    car,
    address,
    center,
    consumption,
    balance,
    coupon,
    dinner
  }
})
