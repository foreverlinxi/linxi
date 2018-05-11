let baseURL = ''
let requestMethod = 'post'

switch (process.env.SS_ENV) {
  case 'DEV': // 本地环境
    baseURL = 'http://' + window.location.hostname + ':8888'
    requestMethod = 'get'
    break
  case 'TEST': // 测试环境
    baseURL = ''
    break
  default: // 生产环境
    baseURL = ''
}

export const BASE_URL = baseURL
export const REQUEST_METHOD = requestMethod

export const HOME_DATA = '/homeData.do'
