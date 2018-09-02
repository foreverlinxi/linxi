<template>
  <div class="" style="">
    <div class="order-bg">
      <div class=" order-service-cost">
        <div class="order-money-cost order-layout" style="padding-top:6px;">
          <div class="detail-left">服务费用</div>
          <div class="detail-ct">¥ {{orderInfo.servicePrice}}</div>
        </div>
        <div class="order-money-cost order-layout" v-for="(item, key) in servicePricelist" :key="item.index">
          <div class="detail-left">{{key}}</div>
          <div class="detail-ct">¥ {{item}}</div>
        </div>
 <!--        <div class="order-money-cost order-layout">
          <div class="detail-left">充值卡</div>
          <div class="detail-ct">¥ {{orderInfo.servicePrice}}</div>
        </div>
        <div class="order-money-cost order-layout">
          <div class="detail-left">回家精洗40元优惠劵</div>
          <div class="detail-ct">¥ {{orderInfo.servicePrice}}</div>
        </div>
        <div class="order-money-cost order-layout">
          <div class="detail-left">微信支付</div>
          <div class="detail-ct">¥ {{orderInfo.servicePrice}}</div>
        </div> -->
      </div>
      <div class="line"></div>
      <div class="order-layout order-payment">
        <div class="detail-left">实付金额合计</div>
        <div class="detail-ct" style="color:#ED6575">¥ {{orderInfo.totalPrice}}</div>
      </div>
    </div>
    <div class="order-pay order-bg">
      <div class="order-pay-mode order-layout">
        <div class="detail-left">支付方式</div>
        <div class="detail-ct">{{orderInfo.payType}}</div>
      </div>
    </div>
    <div class="order-footer order-bg">
      <div class="order-detail order-layout">
        <div class="detail-left">下单时间</div>
        <div class="detail-ct detail-color">{{orderInfo.createTime}}</div>
        <!-- <div class="detail-right detail-color">18:17:52</div> -->
      </div>
      <div class="order-detail order-layout">
        <div class="detail-left">订单编号</div>
        <div class="detail-ct detail-color">{{orderInfo.orderNo}}</div>
      </div>
      <div class="order-detail order-layout">
        <div class="detail-left">车牌号码</div>
        <div class="detail-ct detail-color">{{orderInfo.carNo}}</div>
      </div>
      <div class="order-detail order-layout">
        <div class="detail-left">取车时间</div>
        <div class="detail-ct detail-color">{{orderInfo.appointmentTime}}</div>
        <!-- <div class="detail-right detail-color">18:17:52</div> -->
      </div>
    </div>
    <div class="order-fx">
      <div class="order-bg order-border-div" v-if="orderInfo.orderStatus <= 5 " @click="cancelSu(orderInfo.orderNo)">取消订单</div>
      <div class="order-bg order-submit"><a href="tel:13682665858" style="text-decoration: none">联系我们</a></div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'OrderFooter',
  data () {
    return {
      //
      srcData: '',
      // orderData: '',
      servicePricelist: [],
      isDone: false
    }
  },
  props: ['orderInfo'],
  created () {
    this.getFooter()
  },
  methods: {
    getFooter () {
      // let orderData = this.orderInfo
      // console.log(this.orderInfo)
      this.servicePricelist = this.orderInfo.servicePricelist
      // for (var key in this.servicePricelist) {
      //   console(key)
      // }

      this.isDone = true
    },
    cancelSu (orderNo) {
      // let self = this
      this.$store.commit('setOrderParams', {
        paramsKey: 'orderStatus',
        orderNo: orderNo,
        userStatus: '2'
      })
      this.$store.dispatch('updateOrderStatus')
        .then((data) => {
          // self.$router.go(-1)
          this.$router.replace({
            name: 'Home'
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order-bg{
    background: #fff;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .order-money-cost{
    height: 34px;
    line-height: 34px;
  }
  .order-payment{
    height: 40px;
    line-height: 40px;
  }
  .order-layout{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line{
    height: 1px;
    width: 92%;
    margin: auto;
    background: #f0f0f0;
  }
  .order-pay{
    height: 35px;
    line-height: 35px;
    width: 100%;
  }
  .order-pay-mode{
    height: 35px;
    display: flex;
  }
  .order-footer{
    height: 110px;
    line-height: 110px;
    margin-bottom: 40px;
  }
  .order-detail{
    height: 27px;
    line-height: 27px;
  }
  .order-detail div{
    line-height: 22px;
  }
  .order-detail div:first-child{
    color: rgb(101,101,101);
  }
  .detail-color{
    color: rgb(141,141,141);
  }
  .detail-left{
    margin-left: 15px;
  }
  .detail-ct{
    flex: 1;
    text-align: right;
    margin-right: 12px;
  }
  .detail-right{
    margin-right: 12px;
  }
  .order-fx{
    text-align: right;
    margin-top: 84px;
    /*position: fixed;*/
    /*bottom: 5px;*/
    /*right: 0px;*/
    color: rgb(101,101,101);
  }
  .order-fx div{
    display: inline-block;
    text-align: center;
    height: 24px;
    width: 80px;
    line-height: 24px;
    font-size: 12px;
    border-radius: 25px;
    margin-right: 5px;
  }
  .order-submit{
    background: rgb(95, 197, 241);
    border: 1px solid rgb(95, 197, 241);
    color: #fff;
  }
  .order-border-div{
    border: 1px solid rgb(141, 141, 141);
  }
</style>
