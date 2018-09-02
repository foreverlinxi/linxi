import { QUERY_CONSUMPTION } from './url'

const state = {
  consumptionData: {}
}
const getters = {
  getConsumptionData: state => state.consumptionData
}

const actions = {
  queryConsumptionData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_CONSUMPTION,
      params: state.consumptionParams,
      mutations: 'setConsumptionData'
    })
  }
}

const mutations = {
  setConsumptionData: (state, data) => {
    state.consumptionData = data
  },
  setConsumptionParams: (state, data) => {
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
