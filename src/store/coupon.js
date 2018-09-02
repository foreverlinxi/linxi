import { QUERY_COUPONLIST, QUERY_UNRECOUPONLIST, GET_COUPON } from './url'

const state = {
  couponData: {},
  obtainCouponData: {},
  unerCouponData: {}
}
const getters = {
  getCouponData: state => state.couponData,
  getObtainCouponData: state => state.obtainCouponData,
  getUnerCouponData: state => state.unerCouponData
}

const actions = {
  queryCouponData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_COUPONLIST,
      params: state.couponDataParams,
      mutations: 'setCouponData'
    })
  },
  obtainCoupon: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: GET_COUPON,
      params: state.obtainCouponParams,
      mutations: 'setObtainCouponData'
    })
  },
  queryUnerCouponData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_UNRECOUPONLIST,
      params: state.unerCouponDataParams,
      mutations: 'setUnerCouponData'
    })
  }
}

const mutations = {
  setCouponData: (state, data) => {
    state.couponData = data
  },
  setObtainCouponData: (state, data) => {
    state.obtainCouponData = data
  },
  setUnerCouponData: (state, data) => {
    state.unerCouponData = data
  },
  setCouponParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  },
  setObtainCouponParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  },
  setUnerCouponParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
