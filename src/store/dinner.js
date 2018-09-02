import { QUERY_USERDINNER, QUERY_ORGDINNER, BUY_DINNER } from './url'

const state = {
  userDinnerData: {},
  orgDinnerData: {},
  buyDinnerData: {}
}
const getters = {
  getUserDinnerData: state => state.userDinnerData,
  getOrgDinnerData: state => state.orgDinnerData,
  getBuyDinnerData: state => state.buyDinnerData
}

const actions = {
  queryUserDinnerData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_USERDINNER,
      params: state.userDinnerParams,
      mutations: 'setUserDinnerData'
    })
  },
  queryOrgDinnerData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_ORGDINNER,
      params: state.orgDinnerParams,
      mutations: 'setOrgDinnerData'
    })
  },
  buyDinner: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: BUY_DINNER,
      params: state.buyDinnerParams,
      mutations: 'setBuyDinnerData'
    })
  }
}

const mutations = {
  setUserDinnerData: (state, data) => {
    state.userDinnerData = data
  },
  setOrgDinnerData: (state, data) => {
    state.orgDinnerData = data
  },
  setBuyDinnerData: (state, data) => {
    state.buyDinnerData = data
  },
  setUserDinnerParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  },
  setOrgDinnerParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  },
  setHttpParams: (state, data) => {
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
