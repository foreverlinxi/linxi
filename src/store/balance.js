import { MY_BALANCE, QUERY_BALANCE, BUY_BALANCE } from './url'

const state = {
  balanceListData: {},
  balanceData: {},
  buyBalanceData: {}
}
const getters = {
  getBalanceListData: state => state.balanceListData,
  getbalanceData: state => state.balanceData,
  getBuyBalanceData: state => state.buyBalanceData
}

const actions = {
  queryBalanceListData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: MY_BALANCE,
      params: state.balanceListDataParams,
      mutations: 'setBalanceListData'
    })
  },
  queryBalanceData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_BALANCE,
      params: state.balanceParams,
      mutations: 'setBalanceData'
    })
  },
  buyBalance: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: BUY_BALANCE,
      params: state.buyBalanceParams,
      mutations: 'setBuyBalanceData'
    })
  }
}

const mutations = {
  setBalanceListData: (state, data) => {
    state.balanceListData = data
  },
  setBalanceData: (state, data) => {
    state.balanceData = data
  },
  setBuyBalanceData: (state, data) => {
    state.buyBalanceData = data
  },
  setBalanceListParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  },
  setBalanceParams: (state, data) => {
    const key = data.paramsKey
    delete data.paramsKey
    if (!state[key]) {
      state[key] = {}
    }
    Object.assign(state[key], data)
  },
  setBuyBalanceParams: (state, data) => {
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
