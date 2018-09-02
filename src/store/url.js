let baseURL = ''
let requestMethod = 'post'
let imgBaseUrl = ''

switch (process.env.SS_ENV) {
  case 'DEV': // 本地环境
    baseURL = 'http://' + window.location.hostname + ':8888'
    requestMethod = 'get'
    imgBaseUrl = 'http://chegongfang.oss-cn-shenzhen.aliyuncs.com/'
    break
  case 'TEST': // 测试环境
    baseURL = 'https://www.easy-mock.com/mock/5b0829cea17adf6a1441b891/api'
    imgBaseUrl = 'http://chegongfang.oss-cn-shenzhen.aliyuncs.com/'
    break
  default: // 生产环境
    baseURL = 'http://39.108.176.126:8080/gohome'
    imgBaseUrl = 'http://39.108.176.126:8080/gohome/'
}

export const BASE_URL = baseURL
export const IMGBASEURL = imgBaseUrl
export const REQUEST_METHOD = requestMethod

// 获取openid
export const OBTAINOPENID = '/obtainOpenID.do'
// 主页接口
export const HOME_DATA = '/accessHome.do'
// 注册接口
export const REGISTER_HOME = '/registerHome.do'
// 登录接口
export const LOGINUSER = '/loginUser.do'
// 洗车美容页面查询
export const QUERYWASHBEAUTY = '/queryWashBeauty.do'
// 查询美容服务列表
export const QUERYBEAUTYLIST = './queryBeautyList.do'
// 查询门店空闲时间
export const QUERYFREEDATE = '/queryFreeDate.do'
// 提交洗车美容订单
export const SUBMISSIONWASHBEAUTY = '/submissionWashBeauty.do'
// 查询城市
export const QUERYCITY = '/queryCity.do'
// 查询小区
export const QUERYVILLAGE = '/queryVillage.do'
// 短信验证
export const SENDMSG = '/sendMsg.do'
// 设置手机号
export const UPDATEPHONE = '/updatePhone.do'
// 设置城市和小区
export const SETCITYVILLAGE = '/setCityVillage.do'
// 查询质检信息
export const QUERY_CHECK_IFNO = '/qualityReport.do'
// 查询订单详情
export const QUERY_ORDER_IFNO = '/queryOrderDetails.do'
// 修改订单状态
export const UPDATE_ORDER_STATUS = '/updateOrderStatus.do'
// 查询订单列表
export const QUERY_ORDER_LIST = '/queryOrderList.do'
// 提交评价
export const SUBMIT_SSION = '/submissionEvaluation.do.do'
// 查询车辆列表
export const QUERY_CAR_IFNO = '/queryCarList.do'
// 查询车辆详情
export const QUERY_CAR_DETAIL = '/queryCarDetailst.do'
// 查询消息操作
export const QUERY_NEWS_LIST = '/myNewsList.do'
// 查询历史小区
export const QUERY_HISTORY = '/queryHistoryVillage.do'
// 查询车辆品牌
export const QUERY_CAR_BRAND = '/queryCarBrandList.do'
// 查询车辆款式
export const QUERY_CAR_MODER = '/queryModelList.do'
// 新增车辆
export const ADD_CAR = '/addCar.do'
// 个人中心
export const USER_CENTER = '/personalCenter.do'
// 查询充值卡
export const QUERY_BALANCE = '/queryBalance.do'
// 我的充值卡
export const MY_BALANCE = '/myBalance.do'
// 购买充值卡
export const BUY_BALANCE = '/buyBalance.do'
// 消费明细
export const QUERY_CONSUMPTION = '/queryConsumptionList.do'
// 查询优惠券
export const QUERY_COUPONLIST = '/queryCouponList.do'
// 查询未领取优惠券
export const QUERY_UNRECOUPONLIST = '/queryUnreCouponList.do'
// 领取优惠券
export const GET_COUPON = '/receiveCoupon.do'
// 查询套餐卡
export const QUERY_USERDINNER = '/queryUserDinner.do'
// 查询小区套餐卡
export const QUERY_ORGDINNER = '/queryOrgDinner.do'
// 购买套餐
export const BUY_DINNER = '/buyDinner.do'
// 删除车辆
export const DELE_CAR = '/deleteCar.do'
// 更新
export const UPDATE_CAR = '/updateCarDetailst.do'
// 购买套餐
export const UP_PAY_STATUS = '/updatePayStatus.do'
// 获取微信支付信息
export const W_X_PAY = '/queryPay.do'
