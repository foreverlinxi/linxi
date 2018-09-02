import { QUERY_HISTORY } from './url'
const state = {
  historyData: {}
}

const getters = {
  getHistoryData: state => state.historyData
}

const actions = {
  queryHistoryData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_HISTORY,
      params: state.adreePames,
      mutations: 'setHistoryData'
    })
  }
}

const mutations = {
  setHistoryData: (state, data) => {
    state.getHistoryData = data
  },
  setHistoryParams: (state, data) => {
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
