import {QUERY_CAR_IFNO, QUERY_CAR_DETAIL, QUERY_CAR_BRAND, QUERY_CAR_MODER, ADD_CAR, DELE_CAR, UPDATE_CAR} from './url'
const state = {
  carData: {},
  carDetail: {},
  carBrand: {},
  carModer: {},
  carAdd: {},
  updateCar: {}
}

const getters = {
  getCarData: state => state.checkData,
  getCarDetail: state => state.carDetail,
  getCarBrand: state => state.carBrand,
  getCarModer: state => state.carModer,
  getCarAdd: state => state.carModer,
  carAdd: state => state.carModer,
  updateCar: state => state.carModer
}

const actions = {
  queryCarData: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_CAR_IFNO,
      params: state.setCarParams,
      mutations: 'setCarData'
    })
  },
  queryCarDetail: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_CAR_DETAIL,
      params: state.setParams,
      mutations: 'setCarDetail'
    })
  },
  queryCarBrand: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_CAR_BRAND,
      params: '',
      mutations: 'setCarBrand'
    })
  },
  queryCarModer: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: QUERY_CAR_MODER,
      params: state.carModerParams,
      mutations: 'setCarModer'
    })
  },
  addCar: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: ADD_CAR,
      params: state.carAddParams,
      mutations: 'setCarAdd'
    })
  },
  deleteCar: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: DELE_CAR,
      params: state.deleteCarParams,
      mutations: 'setCardele'
    })
  },
  updateCar: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: UPDATE_CAR,
      params: state.updateCarParams,
      mutations: 'setCardele'
    })
  }
}

const mutations = {
  setCarData: (state, data) => {
    state.checkData = data
  },
  setCarDetail: (state, data) => {
    state.carDetail = data
  },
  setCarBrand: (state, data) => {
    state.carBrand = data
  },
  setCarModer: (state, data) => {
    state.carModer = data
  },
  setCarAdd: (state, data) => {
    state.carAdd = data
  },
  setCardele: (state, data) => {
    state.carAdd = data
  },
  setCarParams: (state, data) => {
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
