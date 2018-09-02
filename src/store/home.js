import { HOME_DATA, OBTAINOPENID } from './url'
import Lockr from 'lockr'

const state = {
  homeData: {},
  openId: {}
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
  },
  getOpenId: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: OBTAINOPENID,
      params: state.openIdParams,
      mutations: 'setOpenId'
    })
  }
}

const mutations = {
  setHomeData: (state, data) => {
    state.homeData = data
  },
  setOpenId: (state, data) => {
    state.openId = data
    Lockr.set('openid', data.openid)
  },
  // 更新cityName,cityId,orgName,orgId
  setUpdateLocation: (state, data) => {
    Object.assign(state.homeData, data)
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
