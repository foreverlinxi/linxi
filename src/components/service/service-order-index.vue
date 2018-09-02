<template>
  <div v-if="isDone">
    <!-- 服务项目 -->
    <ServiceOrderProject :setPayAndDate="setPayAndDate" :setAppointmentTime="setAppointmentTime" :countDinnerCut="countDinnerCut" :setCouponButton="setCouponButton"/>
    <!-- 门店定位和车牌号 -->
    <ServiceOrderShopCarnum :carMessage="carMessage"/>
    <!-- 车辆定位 -->
    <ServiceOrderTimeLocation :goodsDate="goodsDate" :appointmentTime="appointmentTime" :setAppointmentTime="setAppointmentTime" :setVehicleLocation="setVehicleLocation"/>
    <!-- 账户列表信息 -->
    <ServiceOrderAccount
    :hasCutDinnerList="hasCutDinnerList"
    :setBalanceCutButton="setBalanceCutButton"
    :setDinnerCutButton="setDinnerCutButton"
    :afterDinnerCutPrice="afterDinnerCutPrice"
    :afterBalanceCutPrice="afterBalanceCutPrice"
    :goodsIdList="goodsIdList"
    :couponButton="couponButton"
    :setCouponButton="setCouponButton"
    :allPrice="allPrice"
    style="margin-top: 10px;margin-bottom: 46px;"/>
    <!-- 底部提交订单 -->
    <ServiceOrderFooter :allPrice="allPrice" :submissionWashBeauty="submissionWashBeauty"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceOrderProject from './service-order-project'
import ServiceOrderShopCarnum from './service-order-shop-carnum'
import ServiceOrderTimeLocation from './service-order-time-location'
import ServiceOrderAccount from './service-order-account'
import ServiceOrderFooter from './service-order-footer'
// 操作localstorage的库
import Lockr from 'lockr'
import weChatPay from '@/common/weChatPay'

export default {
  name: 'ServiceOrderIndex',
  data () {
    return {
      isDone: false,
      // 价格
      pay: 0,
      // 余额支付开关
      balanceCutButton: 'N',
      // 余额抵扣总额
      // balanceCut: 0,
      // 套餐卡抵扣总额
      dinnerCut: 0,
      // 套餐卡按钮开关
      dinnerCutButton: 'Y',
      // 优惠券抵扣总额
      couponCut: 0,
      // 优惠开关按钮
      couponButton: 'N',
      // 服务时长
      goodsDate: 0,
      // 预约取车时间
      appointmentTime: '',
      // 已经抵扣的套餐卡数组集合
      hasCutDinnerList: [],
      // 下单的服务项目id数组
      goodsIdList: [],
      // 车辆停放地址
      vehicleLocation: '',
      // 使用套餐卡ID
      packageId: []
    }
  },
  components: {
    ServiceOrderProject,
    ServiceOrderShopCarnum,
    ServiceOrderTimeLocation,
    ServiceOrderAccount,
    ServiceOrderFooter
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData',
      getWashBeauty: 'getWashBeauty',
      getActiveCar: 'getActiveCar'
    }),
    // 最终付款金额
    allPrice () {
      console.log(this.pay - this.dinnerCutPrice - this.couponCut - this.balanceCut)
      return this.pay - this.dinnerCutPrice - this.couponCut - this.balanceCut
    },
    // 套餐卡抵扣了多少
    dinnerCutPrice () {
      return this.dinnerCutButton === 'Y' ? this.dinnerCut : 0
    },
    // 实际余额支付了多少钱
    balanceCut () {
      if (this.balanceCutButton === 'Y') {
        // 看下最后金额是否小于0
        let lastPay = this.pay - this.dinnerCutPrice - this.getWashBeauty.balance - this.couponCut
        // 最后用余额减了多少，如果小于0，说明减了剩下的金额，如果没有小于等于0，就是减了余额的全部
        return lastPay <= 0 ? this.pay - this.dinnerCutPrice - this.couponCut : this.getWashBeauty.balance
      } else {
        return 0
      }
    },
    // 当前项目总金额-套餐卡抵扣，如果等于0，那么余额支付不开启
    afterDinnerCutPrice () {
      let dinnerCutPrice = this.dinnerCutButton === 'Y' ? this.dinnerCut : 0
      let couponCut = this.couponButton === 'Y' ? this.couponCut : 0
      return this.pay - dinnerCutPrice - couponCut
    },
    // 使用余额支付后的总金额
    afterBalanceCutPrice () {
      let dinnerCutPrice = this.balanceCutButton && this.dinnerCutButton === 'Y' ? this.dinnerCut : 0
      // 看下最后金额是否小于0
      let balanceCut = this.balanceCutButton === 'Y' ? this.getWashBeauty.balance : 0
      let couponCut = this.couponButton === 'Y' ? this.couponCut : 0
      let lastPay = this.pay - dinnerCutPrice - balanceCut - couponCut
      return lastPay <= 0 ? 0 : lastPay
    },
    // 支付类型 0.余额支付 1.微信支付 3.余额+微信支付
    payType () {
      if (this.allPrice === 0) {
        return '0'
      } else if (this.allPrice > 0 && this.balanceCut === 0) {
        return '1'
      } else if (this.allPrice > 0 && this.balanceCut > 0) {
        return '3'
      }
    },
    // 车辆相关信息
    carMessage () {
      let carList = this.getWashBeauty.carList
      let activeCar = null
      // 有本地数据先读取本地数据的
      if (activeCar) {
        return {
          carUserId: activeCar.carUserId,
          modelId: activeCar.modelId,
          carNo: activeCar.carNo
        }
      // 没有本地从接口取
      } else if (carList.length > 0) {
        return {
          carUserId: carList[0].carUserId,
          modelId: carList[0].modelId,
          carNo: carList[0].carNo
        }
      } else {
        return {
          carUserId: '',
          modelId: '',
          carNo: '选择车辆'
        }
      }
    }
  },
  activated () {
    this.queryWashBeauty()
  },
  methods: {
    // 查询洗车美容接口
    queryWashBeauty () {
      this.$store.commit('setServiceParams', {
        paramsKey: 'queryWashBeautyParams',
        orgId: this.getHomeData.orgId,
        serverType: this.$route.query.serverType
      })
      this.$store.dispatch('queryWashBeauty')
        .then((data) => {
          this.isDone = true
        })
    },
    // 计算套餐卡抵扣
    countDinnerCut (activeList) {
      // 顺便设置下单的服务项目id数组
      this.setGoodsIdList(activeList)
      let dinnerCutAll = 0
      // 已经抵扣的套餐卡数组集合
      let hasCutDinnerList = []
      // 已抵扣的套餐卡id数组集合
      let hasCutDinnerIdList = []
      activeList.forEach((activeItem) => {
        this.getWashBeauty.haveDinnerGoods.forEach((item) => {
          if (activeItem.goodsId === item.goodsId) {
            dinnerCutAll += Number(activeItem.goodsMoney)
            hasCutDinnerList.push(item)
            hasCutDinnerIdList.push(item.goodsId)
          }
        })
      })
      // 套餐抵扣的金额
      this.dinnerCut = dinnerCutAll
      if (this.dinnerCut > 0) {
        this.dinnerCutButton = 'Y'
      }
      // 选择的id正好有套餐卡抵扣的这部分数组，需要在套餐卡那一行渲染展示
      this.hasCutDinnerList = hasCutDinnerList
      this.packageId = hasCutDinnerIdList
    },
    // 订单入参校验
    validate () {
      if (this.goodsIdList.length === 0) {
        this.showTip('请选择服务项目')
        return false
      }
      if (this.carNo === '选择车辆') {
        this.showTip('请选择车辆')
        return false
      }
      // if (this.appointmentTime === '') {
      //   this.showTip('请选择预约取车时间')
      //   return false
      // }
      if (this.vehicleLocation === '') {
        this.showTip('请填写取车地址')
        return false
      }
      return true
    },
    // 提交洗车美容订单
    submissionWashBeauty () {
      // 校验不通过，弹出提示
      if (!this.validate()) return
      if (this.dinnerCutButton === 'Y' && (!this.packageId)) { this.dinnerCutButton = 'N' }
      this.$store.commit('setServiceParams', {
        paramsKey: 'submissionParams',
        goodsId: JSON.stringify(this.goodsIdList), // 服务项目
        orgId: this.getHomeData.orgId, // 小区id
        modelId: this.carMessage.modelId, // 车辆款式
        carUserId: this.carMessage.carUserId, // 用户车辆id
        carNo: this.carMessage.carNo, // 车牌号
        vehicleLocation: this.vehicleLocation, // 取车地址
        appointmentTime: this.appointmentTime, // 预约时间
        orderPrice: this.pay, // 订单总金额，不扣除账户剩余金额、套餐卡、优惠券
        payReal: this.allPrice, // 用户实际付款金额
        isCoupon: this.couponButton === 'Y' ? '1' : '0', // 是否使用优惠券，0未使用，1使用
        Coupon: this.couponButton === 'Y' ? Lockr.get('activeCoupon').couponId : '', // 优惠券id
        isPackage: this.dinnerCutButton === 'Y' ? '1' : '0', // 是否使用套餐卡
        packageId: JSON.stringify(this.packageId), // 使用的套餐卡id数组
        isBalance: this.balanceCutButton === 'Y' ? '1' : '0', // 是否使用充值卡
        payType: this.payType, // 支付类型   0.余额支付 1.微信支付 3.余额+微信支付
        goodsDate: this.goodsDate, // 服务总时间
        balance: this.balanceCut // 充值卡实际支付金额
      })
      this.$store.dispatch('submissionWashBeauty')
        .then((res) => {
          // serverStatus为1正常接单，0的话提示技师服务已满。在service-order-time-location组件中watch
          if (res.serverStatus === '1') {
            if (String(res.result) === '1') {
              if (this.payType === '1' || this.payType === '3') {
                this.buyBalance(res.orderNo, this.allPrice)
                return
              }
              this.$store.commit('setServiceParams', {
                paramsKey: 'payStatus',
                orderNo: res.orderNo,
                code: '0'
              })
              this.$store.dispatch('upPayStatus').then((data) => {
                if (data.result === '1') {
                  this.$router.push({
                    name: 'ServiceSuccess',
                    query: {
                      hostStorePwd: data.hostStorePwd,
                      orderNo: res.orderNo
                    }
                  })
                }
              })
            }
          }
        })
    },
    // 设置总价格和时间
    setPayAndDate (pay, goodsDate) {
      this.pay = pay
      this.goodsDate = goodsDate
    },
    // 设置预约时间
    setAppointmentTime (time) {
      this.appointmentTime = time
    },
    // 设置车辆停放地址
    setVehicleLocation (event) {
      this.vehicleLocation = event.target.value
    },
    // 余额支付是否使用开关
    setBalanceCutButton (button) {
      this.balanceCutButton = button
    },
    // 套餐卡是否使用开关按钮
    setDinnerCutButton (button) {
      this.dinnerCutButton = button
    },
    // 设置下单的服务项目id数组，提交订单接口需要入参
    setGoodsIdList (activeList) {
      let goodsIdList = []
      activeList.forEach((item) => {
        goodsIdList.push(item.goodsId)
      })
      this.goodsIdList = goodsIdList
    },
    // 设置优惠券按钮,抵扣金额
    setCouponButton (button, couponCut) {
      this.couponButton = button
      this.couponCut = couponCut
    },
    // 弹出提示
    showTip (msg) {
      this.$tip.show({
        message: msg
      })
    },
    buyBalance (orderNo, money) {
      let self = this
      console.log(orderNo)
      self.$store.commit('isLoading', true)
      weChatPay({
        userId: this.getHomeData.userId,
        code: '1',
        order: orderNo,
        orgId: this.getHomeData.orgId,
        totalFee: money
      }, function (res) {
        let times = 10
        let setInter = setInterval(function () {
          self.$store.commit('setServiceParams', {
            paramsKey: 'payStatus',
            orderNo: res.order,
            code: '1'
          })
          self.$store.dispatch('upPayStatus').then((data) => {
            times--
            if (times <= 0) {
              clearInterval(setInter)
              self.showTip('请点击个人中心我的订单查看您的支付状态')
            }
            if (data.result === '1') {
              clearInterval(setInter)
              self.$router.push({
                name: 'ServiceSuccess',
                query: {
                  hostStorePwd: data.hostStorePwd,
                  orderNo: orderNo
                }
              })
            }
          })
        }, 3000)
        setInter()
      }, self)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
