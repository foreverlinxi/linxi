<template>
  <div v-if="isDone">
    <div>
      <div class="order-staus">
        <div class="order-status-on" @click="orderIn" :class="{active: status}">进行中</div>
        <div class="order-status-on" @click="finish" :class="{active: isShow}">已完成</div>
      </div>
        <div class="order-mg" v-for="items in orderStatus" :key="items.index" v-if="status">
        <div class="order">
          <div class="order-number">
            <div>订单号：<span>{{items.orderNo}}</span></div>
            <div class="order-number-rt" v-for="itemsText in orderText" :key="itemsText.index" v-if="items.orderStatus == itemsText.status">{{items.payStatus === 0 ? '待付款': itemsText.value}}</div>
          </div>
        <div>
          <section class="section-item" @click="goOrderStatus(items.orderNo)">
            <div class="section-content">
              <img class="wait-home" src="./../../assets/images/order/order-wait-home.jpg">
              <div class="content">
                <div class="content-title">{{items.serviceName}}<span v-if="items.takingType">({{items.takingType}})</span></div>
                <div class="content-item">{{items.servicText}}</div>
                <!-- <div class="content-item">内部精洗除尘/真皮护理...</div> -->
              </div>
              <div></div>
            </div>
          </section>
          <div class="order-total">合计(元)：¥ {{items.totalPrice}}</div>
          </div>
      </div>
      <div class="order-btn">
        <div class="order-btn-text"><span v-if="items.orderStatus >= 8">停车位置：{{items.vehicleLocation}}</span></div>
        <div class="order-btn-cancel order-btn-bg" v-if="items.payStatus === 0" @click="submitPay(items)">立即支付</div>
        <div class="order-btn-cancel" :class="{'order-btn-bg': items.orderStatus >= 8}" @click="cancel(itemsText.text, items.orderNo, items.password)" v-for="itemsText in orderText" :key="itemsText.index" v-if="items.orderStatus == itemsText.status">{{itemsText.text}}</div>
      </div>
      </div>
      <div class="order-mg" v-if="isShow" v-for="finishItem in completeList" :key="finishItem.index">
        <div class="order">
          <div class="order-number">
            <div>订单号：<span>{{finishItem.orderNo}}</span></div>
            <div class="order-number-rt">订单已完成</div>
          </div>
        <div>
          <section class="section-item" @click="goOrderStatus(finishItem.orderNo)">
            <div class="section-content">
              <img class="wait-home" src="./../../assets/images/order/order-wait-home.jpg">
              <div class="content">
                <div class="content-title">{{finishItem.serviceName}}<span v-if="finishItem.takingType">({{finishItem.takingType}})</span></div>
                <div class="content-item">{{finishItem.servicText}}</div>
              </div>
              <div></div>
            </div>
          </section>
          <div class="order-total">合计(元)：¥ {{finishItem.totalPrice}}</div>
          </div>
      </div>
      <div class="order-btn">
        <div class="order-btn-text"></div>
        <!-- <div class="order-btn-cancel">立即支付</div> -->
        <div class="order-btn-cancel order-btn-bg" @click="backHome">再来一单</div>
      </div>
      </div>
    </div>
    <div class="order-pop" v-if="cancelPop">
      <div class="order-pop-content">
        <div class="order-cancel">是否要取消订单</div>
        <div class="cancel-line"></div>
        <div class="cancel-btn">
          <div class="cancel-btn-left" :class="{active: cancelSub}" @click="cancelSu">是</div>
          <div class="cancel-btn-right" @click="cancelOf">否</div>
        </div>
      </div>
    </div>
    <div class="order-pop" v-if="moveUp">
      <div class="order-pop-content">
        <div class="pd">技师正在服务中，提前取钥匙将中断服务，无法申请退款</div>
        <div class="cancel-line"></div>
        <div class="cancel-btn">
          <div class="cancel-btn-left" :class="{active: cancelSub}" @click="cancelSu">是</div>
          <div class="cancel-btn-right" @click="cancelOf">否</div>
        </div>
      </div>
    </div>
    <div class="order-pop" v-if="isKey">
      <div class="order-pop-content">
        <div class="getKey">
          <span>取钥匙码</span>
          <span style="float: right;" @click="cancelOf">X</span>
        </div>
        <div class="key-code">{{KeyCode}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import weChatPay from '@/common/weChatPay'

export default{
  name: 'OrderStatus',
  data () {
    return {
      orderStatus: [
      ],
      orderText: [
        {status: 1, text: '取消订单', value: '等待技师取车服务'},
        {status: 2, text: '取消订单', value: '等待技师取车服务'},
        {status: 3, text: '取消订单', value: '等待技师取车服务'},
        {status: 4, text: '取消订单', value: '等待技师取车服务'},
        {status: 5, text: '提前取车', value: '技师服务中'},
        {status: 6, text: '提前取车', value: '技师服务中'},
        {status: 7, text: '提前取车', value: '技师服务中'},
        {status: 8, text: '取钥匙码', value: '等待用户取走钥匙'},
        {status: 9, text: '取钥匙码', value: '等待用户取走钥匙'}
      ],
      completeList: [
      ],
      status: true,
      isShow: false,
      cancelPop: false,
      isKey: false,
      KeyCode: '',
      cancellOrder: '', // 取消订单的订单号
      moveUp: false,
      cancelSub: true,
      cancelOff: false,
      isDone: false
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.$store.commit('setOrderParams', {
        paramsKey: 'setOrderListParams',
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryOrderList')
        .then((data) => {
          this.orderStatus = data.orderList
          // this.orderStatus[0].orderStatus = 7
          this.completeList = data.completeList
          this.returnData()
          this.isDone = true
        })
    },
    returnData () {
    },
    goOrderStatus (orderNo) {
      // 查看订单详情
      this.$router.push({
        name: 'OrderIndex',
        query: {
          orderNo: orderNo
        }
      })
    },
    orderIn () {
      console.log('222')
      this.status = true
      this.isShow = false
    },
    finish () {
      console.log('2111')
      this.isShow = true
      this.status = false
    },
    cancel (choose, orderNo, password) {
      console.log(choose, password)
      if (choose === '取消订单') {
        this.cancellOrder = orderNo
        this.cancelPop = true
      }
      if (choose === '取钥匙码') {
        this.isKey = true
        this.KeyCode = password
      }
      if (choose === '提前取车') {
        this.moveUp = true
      }
    },
    cancelSu () {
      let self = this
      this.$store.commit('setOrderParams', {
        paramsKey: 'orderStatus',
        orderNo: this.cancellOrder,
        userStatus: '2'
      })
      this.$store.dispatch('updateOrderStatus')
        .then((data) => {
          this.cancelPop = false
          self.getOrderList()
        })
    },
    cancelOf () {
      this.cancelPop = false
      this.moveUp = false
      this.isKey = false
    },
    backHome () {
      this.$router.push({
        name: 'Home'
      })
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
              self.getOrderList()
            }
            if (data.result === '1') {
              clearInterval(setInter)
              self.getOrderList()
            }
          })
        }, 3000)
        setInter()
      }, self)
    }
  }
}
</script>

<style scoped="">
  .section-item{
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .section-content{
    width: 96%;
    height: 80px;
    display: flex;
    align-items: center;
    background: rgb(251,251,251);
  }
  .active {
    background: #5ac4f3;
    color: #fff;
  }
  .wait-home{
    height: 60px;
    width: 60px;
    display: inline-block;
    vertical-align: middle;
    margin: 0px 15px 0px 15px;
  }
  .content{
    display: inline-block;
    font-size: 12px;
  }
  .content-title{
    margin-bottom: 8px;
    color: rgb(37, 37, 37);
  }
  .content-item{
    color: rgb(141,141,141);
    width: 75%;
  }
  .order-staus{
    display: flex;
    background: #fff;
    margin-bottom: 10px;
    color: rgb(141, 141, 141);
    font-size: 12px;
  }
  .order-status-on{
    width: 50%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .order-status-bg{
    background: rgb(95, 197, 241);
    color: #fff;
  }
  .order-number{
    display: flex;
    width: 100%;
  }
  .order{
    background: #fff;
    padding: 10px 20px;
    font-size: 12px;
    color: rgb(141, 141, 141);
  }
  .order-number-rt{
    flex: 1;
    text-align: right;
    color: rgb(95, 197, 241);
  }
  .order-total{
    width: 90%;
    text-align: right;
  }
  .order-btn{
    display: flex;
    align-items: center;
    height: 44px;
    width: 100%;
    line-height: 44px;
    background: rgb(251,251,251);
    font-size: 12px;
  }
  .order-btn-cancel{
    width: 70px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border: 1px solid rgb(128, 128, 128);
    border-radius: 25px;
    margin-right: 20px;
  }
  .order-mg{
    margin-bottom: 10px;
    color: rgb(141, 141, 141)
  }
  .order-btn-text{
    flex: 1;
    margin-left: 25px;
  }
  .order-btn-bg{
    background: rgb(95, 197, 241);
    color: #fff;
    border: none;
  }
  .order-pop{
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 50;
    background-color:rgba(0, 0, 0, 0.5);
  }
  .order-pop-content{
    position: absolute;
    top: 20%;
    width: 80%;
    height: 120px;
    opacity: 1;
    z-index: 51;
    margin-top: 30%;
    background: #fff;
    border-radius: 10px;
  }
  .order-cancel{
    height: 80px;
    line-height: 80px;
    vertical-align: center;
    font-size: 16px;
    text-align: center;
  }
  .cancel-line{
    height: 1px;
    background: rgb(95, 197, 241);
  }
  .cancel-btn{
    width: 100%;
    display: flex;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #fff;
    font-size: 13px;
  }
  .cancel-btn div{
    display: inline-block;
    text-align: center;
    height: 39px;
    line-height: 34px;
    width: 50%;
  }
  .cancel-btn-left{
    border-bottom-left-radius: 10px;
  }
  .cancel-btn-right{
    border-bottom-right-radius: 10px;
  }
  .pd{
    padding: 30px 20px 0px 20px;
    height: 80px;
    vertical-align: center;
    font-size: 16px;
    text-align: center;
  }
  .getKey{
    background: rgb(95, 197, 241);
    color: #fff;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .key-code{
    position: absolute;
    width: 100%;
    top: 50%;
    font-size: 20px;
    flood-color: #656565;
    text-align: center;
  }
</style>
