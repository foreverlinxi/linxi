import {QUERY_ORDER_IFNO, QUERY_ORDER_LIST, UPDATE_ORDER_STATUS, SUBMIT_SSION} from './url'

const state = {
  orderData: {},
  orderList: {},
  upDateStatus: {}
}

const getters = {
  getOrderData: state => state.checkData,
  getOrderList: state => state.orderList,
  getOrderStatus: state => state.upDateStatus
}

const actions = {
  queryOrderData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_ORDER_IFNO,
      params: state.setOrderParams,
      mutations: 'setOrderData'
    })
  },
  queryOrderList: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_ORDER_LIST,
      params: state.setOrderListParams,
      mutations: 'setOrderList'
    })
  },
  updateOrderStatus: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: UPDATE_ORDER_STATUS,
      params: state.orderStatus,
      mutations: 'setOrderStatus'
    })
  },
  sibmitSsion: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: SUBMIT_SSION,
      params: state.submitSsionData,
      mutations: ''
    })
  }
}

const mutations = {
  setOrderData: (state, data) => {
    state.checkData = data
  },
  setOrderList: (state, data) => {
    state.orderList = data
  },
  setOrderStatus: (state, data) => {
    state.upDateStatus = data
  },
  setOrderParams: (state, data) => {
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
