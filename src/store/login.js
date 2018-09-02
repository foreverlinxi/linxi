import { REGISTER_HOME, LOGINUSER, SENDMSG, UPDATEPHONE } from './url'
import Lockr from 'lockr'

const state = {
  registerHome: {},
  loginUser: {},
  sendMsg: {},
  updatePhone: {}
}

const getters = {
  getRegisterHome: state => state.registerHome
}

const actions = {
  // 注册
  registerHome: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: REGISTER_HOME,
      params: state.registerHomeParams,
      mutations: 'setRegisterHome'
    })
  },
  // 登录
  loginUser: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: LOGINUSER,
      params: state.loginUserParams,
      mutations: 'setLoginUser'
    })
  },
  // 短信验证
  sendMsg: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: SENDMSG,
      params: state.sendMsgParams,
      mutations: 'setSendMsg'
    })
  },
  // 修改手机号
  updatePhone: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: UPDATEPHONE,
      params: state.updatePhoneParams,
      mutations: 'setUpdatePhone'
    })
  }
}

const mutations = {
  setRegisterHome: (state, data) => {
    state.registerHome = data
    Lockr.set('token', data.token)
  },
  setLoginUser: (state, data) => {
    state.loginUser = data
    Lockr.set('token', data.token)
  },
  setSendMsg: (state, data) => {
    state.sendMsg = data
  },
  setUpdatePhone: (state, data) => {
    state.updatePhone = data
  },
  setRegisterHomeParams: (state, data) => {
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
