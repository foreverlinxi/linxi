import Axios from 'axios'
import Qs from 'qs'
import { BASE_URL, REQUEST_METHOD } from './url'

const state = {
  isLoading: false,
  response: {},
  commonParams: {
  }
}

const getters = {
  isLoading: state => state.isLoading,
  getResponse: state => state.response
}

const actions = {
  httpRequest: ({ state, commit }, { url, params, mutations }) => {
    return new Promise((resolve, reject) => {
      Object.assign(params, state.commonParams)
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
          if (data.flag === '1') {
            commit(mutations, data.data)
            resolve(data.data)
          }
        })
        .catch(() => {
          commit('isLoading', false)
          commit('setResponse', {
            flay: '2',
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
