import { QUERYCITY, QUERYVILLAGE, SETCITYVILLAGE } from './url'

const state = {
  cityData: {},
  queryCityParams: {},
  villageData: {},
  cityVillageData: {}
}

const getters = {
  getCity: state => state.cityData,
  getVillage: state => state.villageData
}

const actions = {
  // 查询城市
  queryCity: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERYCITY,
      params: state.queryCityParams,
      mutations: 'setCityData'
    })
  },
  // 查询小区
  queryVillage: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERYVILLAGE,
      params: state.queryVillageParams,
      mutations: 'setVillageData'
    })
  },
  // 设置城市和小区
  setCityVillage: ({ state, dispatch }) => {
    console.log(state.setCityVillageParams)
    return dispatch('httpRequest', {
      url: SETCITYVILLAGE,
      params: state.setCityVillageParams,
      mutations: 'setCityVillageData'
    })
  }
}

const mutations = {
  setCityData: (state, data) => {
    state.cityData = data
  },
  setVillageData: (state, data) => {
    state.villageData = data
  },
  setCityVillageData: (state, data) => {
    state.cityVillageData = data
  },
  setLocationParams: (state, data) => {
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
