<template>
  <div class="home-order" v-if="orderBrief">
    <div class="left"></div>
    <div class="content">
      <div class="order-num"><span>订单号：{{orderBrief.orderNo}}</span></div>
      <div class="order-content">
        <div class="progress">
          <span class="progress-nowStatus">{{orderStatusList[orderStatus - 1]}}</span>
          <img src="./../../assets/images/home/progress.png"/>
          <span class="progress-nextStatus">{{orderStatusList[orderStatus]}}</span>
        </div>
        <div class="title">{{orderBrief.serviceName}}</div>
        <div class="location">停车位置：{{orderBrief.vehicleLocation}}</div>
        <div class="button" @click="buttonFun(orderBrief.orderNo)"><span>{{payStatusStr}}</span></div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weChatPay from '@/common/weChatPay'

export default {
  name: 'HomeOrder',
  data () {
    return {
      orderStatusList: [
        '预约成功',
        '派单成功',
        '车主存钥匙成功',
        '技师取钥匙成功',
        '完成验车',
        '正在施工',
        '完工质检',
        '技师存钥匙',
        '订单完成'
      ]
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    }),
    // 首页订单简略信息
    orderBrief () {
      return this.getHomeData.orderBrief
    },
    // 支付状态，显示在按钮中的
    payStatusStr () {
      console.log(this.orderBrief.payStatus)
      return this.orderBrief && String(this.orderBrief.payStatus) === '0' ? '立即支付' : '查看详情'
    },
    // 订单状态： 1预约成功；2派单成功；3车主存钥匙成功；4技师取钥匙成功；5完成验车；6正在施工；7完工质检；8技师存钥匙；9订单完成
    orderStatus () {
      return Number(this.orderBrief.orderStatus)
    }
  },
  methods: {
    // 查看订单详情或者去微信支付
    buttonFun (orderNo) {
      let payStatus = this.orderBrief ? String(this.orderBrief.payStatus) : ''
      if (payStatus === '0') {
        // 跳微信支付
        this.submitPay(this.orderBrief)
      } else if (payStatus === '1') {
        // 查看订单详情
        this.$router.push({
          name: 'OrderIndex',
          query: {
            orderNo: orderNo
          }
        })
      }
    },
    submitPay (items) {
      let self = this
      self.$store.commit('isLoading', true)
      weChatPay({
        userId: this.getHomeData.userId,
        code: '4',
        order: items.orderNo,
        orgId: this.getHomeData.orgId,
        totalFee: items.totalPrice
      }, function (res) {
        self.orderBrief.payStatus = '1'
      }, self)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-order {
  margin-top: 10px;
  /* margin-bottom: 10px; */
  width: 100%;
  height: 160px;
  display: flex;
  color: #8d8d8d;
}
.home-order-content {
  display: flex;
}
.content {
  background: #fff;
  flex: 1;
  height: 160px;
  font-size: 11px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #e6e6e6;
}
.left, .right{
  width: 10px;
}
.order-num {
  height: 30px;
  width: 100%;
  background: #5dc3f4;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 13px;
  color: #fff;
  /* vertical-align: top; */
}
.order-num>span {
  display: inline-block;
  margin-left: 15px;
  line-height: 30px;
}
.order-content {
  height: 130px;
  width: 100%;
}
.progress {
  /* text-align: center; */
  font-size: 14px;
  margin-top: 10px;
  color: #000000;
  display: flex
}
.progress-nowStatus {
  flex: 1;
  text-align: right;
}
.progress-nextStatus {
  flex: 1;
}
.progress>img {
  height: 13px;
  width: 92px;
  margin-left: 7px;
  margin-right: 7px;
  flex: 1;
  margin-top: 4px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: #58c3f2;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.location {
  text-align: center;
}
.button {
  font-size: 11px;
  height: 22px;
  width: 105px;
  background: #58c3f2;
  text-align: center;
  margin: 8px auto;
  border-radius: 22px;
}
.button>span {
  height: 22px;
  color: #fff;
  line-height: 22px;
}
</style>
