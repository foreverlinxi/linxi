import {QUERY_CHECK_IFNO, QUERY_NEWS_LIST} from './url'
const state = {
  checkData: {},
  newsData: {}
}

const getters = {
  getCheckData: state => state.checkData,
  getNewsData: state => state.setNewsData
}

const actions = {
  queryCheckData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_CHECK_IFNO,
      params: state.setCheckParams,
      mutations: 'setCheckData'
    })
  },
  queryNewsData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_NEWS_LIST,
      params: state.newsList,
      mutations: 'setNewsData'
    })
  }
}

const mutations = {
  setCheckData: (state, data) => {
    state.checkData = data
  },
  setNewsData: (state, data) => {
    state.checkData = data
  },
  setCheckParams: (state, data) => {
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
