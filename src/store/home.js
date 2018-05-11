import { HOME_DATA } from './url'

const state = {
  homeData: {},
  homeDataParams: {}
}

const getters = {
  getHomeData: state => state.homeData
}

const actions = {
  queryHomeData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: HOME_DATA,
      params: state.homeDataParams,
      mutations: 'setHomeData'
    })
  }
}

const mutations = {
  setHomeData: (state, data) => {
    state.homeData = data
  },
  setHomeParams: (state, data) => {
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
