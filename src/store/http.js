import Axios from 'axios'
import Qs from 'qs'
import { BASE_URL, REQUEST_METHOD } from './url'
import Lockr from 'lockr'

const state = {
  isLoading: false,
  response: {}
}

const getters = {
  isLoading: state => state.isLoading,
  getResponse: state => state.response
}

const actions = {
  httpRequest: ({ state, commit, rootState }, { url, params, mutations }) => {
    return new Promise((resolve, reject) => {
      // userId和token作为公共入参，从主页接口获取
      Object.assign(params, {
        userId: rootState.home.homeData.userId || '915',
        token: Lockr.get('token') || '1Bgj7hmkLzu1a7olvOgKlZVKwC8kaNvzxdQZhsPBMs464FCsoAh68AGJwZgKzZH3'
      })
      console.log(params)
      commit('isLoading', true)
      Axios({
        url,
        data: Qs.stringify(params),
        method: REQUEST_METHOD,
        baseURL: BASE_URL,
        timeout: 60000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(({data}) => {
          commit('isLoading', false)
          commit('setResponse', data)
          console.log(data.flag)
          if (data.flag === '1') {
            commit(mutations, data.data)
            resolve(data.data)
          }
        })
        .catch(() => {
          commit('isLoading', false)
          commit('setResponse', {
            flag: '2',
            msg: '网络异常，请稍后再试！'
          })
        })
    })
  }
}

const mutations = {
  isLoading: (state, data) => {
    state.isLoading = data
  },
  setResponse: (state, data) => {
    state.response = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
