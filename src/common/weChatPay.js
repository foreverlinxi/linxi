import Axios from 'axios'
import Qs from 'qs'
import { BASE_URL, REQUEST_METHOD, W_X_PAY } from '../store/url'
import Lockr from 'lockr'

// 获取签名成功，调用微信支付
function buy (data, callback, self) {
  /* eslint-disable */
  function onBridgeReady () {
    WeixinJSBridge.invoke (
      'getBrandWCPayRequest', {
        appId: data.appId, // 公众号名称,由商户传入
        timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: data.nonceStr, // 随机串
        package: data.prepayId,
        signType: data.signType, // 微信签名方式
        paySign: data.paySign // 微信签名
      },
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // 调用方传入的回调函数
          callback && callback(data)
          return
        }
      }
    )
  }
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}
// 获取微信js-sdk签名
function queryWeCharSign (params, callback, self) {
  Axios({
    url: W_X_PAY,
    data: Qs.stringify(params),
    method: REQUEST_METHOD,
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(({data}) => {
      self.$store.commit('isLoading', false)
      if (data.flag === '1') {
        // 获取签名成功，调用微信支付
        buy(data.data, callback, self)
      }
    })
    .catch(() => {
      //
      self.$store.commit('isLoading', false)
      self.$store.commit('setResponse', {
        flag: '2',
        msg: '网络异常，请稍后再试！'
      })
    })
}
// 获取手机设备类型
function getPhone () {
  let text = window.navigator.userAgent || ''
  let phone = ''
  if (text.indexOf('Android') !== -1) {
    // phone = text.match(/Android.*;/g)[0].replace(/;/, '')
    phone = 'Android'
  } else {
    phone = 'iPhone'
  }
  return phone
}

// 对外暴露的接口
function weChatPay (params, callback, self) {
  // 合并userId，token和设备类型作为入参，需要传入的入参为body操作描述和totalFee付款总金额，是一个对象形式
  console.log(self)
  Object.assign(params, {
    token: Lockr.get('token') || '',
    deviceInfo: getPhone()
  })
  queryWeCharSign(params, callback, self)
}

export default weChatPay
