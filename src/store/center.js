import { USER_CENTER } from './url'

const state = {
  userData: {}
}
const getters = {
  getUserData: state => state.userData
}

const actions = {
  queryUserData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: USER_CENTER,
      params: state.userDataParams,
      mutations: 'setUserData'
    })
  }
}

const mutations = {
  setUserData: (state, data) => {
    state.userData = data
  },
  setUserParams: (state, data) => {
    console.log(data)
    console.log(state)
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
