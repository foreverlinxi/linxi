import { QUERYWASHBEAUTY, QUERYBEAUTYLIST, QUERYFREEDATE, SUBMISSIONWASHBEAUTY, UP_PAY_STATUS } from './url'

const state = {
  washBeauty: {},
  beautyList: {},
  freeDate: {},
  submisson: {},
  payStatus: {}
}

const getters = {
  getWashBeauty: state => state.washBeauty,
  getSubmisson: state => state.submisson
}

const actions = {
  // 查询洗车美容接口
  queryWashBeauty: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERYWASHBEAUTY,
      params: state.queryWashBeautyParams,
      mutations: 'setWashBeauty'
    })
  },
  // 查询美容服务列表
  queryBeautyList: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERYBEAUTYLIST,
      params: state.queryBeautyListParams,
      mutations: 'setBeautyList'
    })
  },
  // 查询门店空闲时间
  queryFreeDate: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERYFREEDATE,
      params: state.queryFreeDateParams,
      mutations: 'setFreeDate'
    })
  },
  // 提交洗车美容订单
  submissionWashBeauty: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: SUBMISSIONWASHBEAUTY,
      params: state.submissionParams,
      mutations: 'setSubmisson'
    })
  },
  upPayStatus: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: UP_PAY_STATUS,
      params: state.payStatus,
      mutations: 'setPayStatus'
    })
  }
}

const mutations = {
  setWashBeauty: (state, data) => {
    state.washBeauty = data
  },
  setBeautyList: (state, data) => {
    state.beautyList = data
  },
  setFreeDate: (state, data) => {
    state.freeDate = data
  },
  setSubmisson: (state, data) => {
    state.submisson = data
  },
  setPayStatus: (state, data) => {
    state.payStatus = data
  },
  setServiceParams: (state, data) => {
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
