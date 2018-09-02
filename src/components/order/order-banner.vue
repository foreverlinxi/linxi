<template>
  <div class="banner" v-if="isDone">
    <div class="technician">
      <div class="order-banner">
        <div :class="srcData"></div>
      </div>
       <div class="order-p"  v-if="orderData.orderStatus <='4'">
        <img src="./../../assets/images/order/order-p.png">
        <div class="order-text">{{orderInfo.vehicleLocation}}</div>
      </div>
      <div class="order-technician" v-if="orderData.orderStatus > '4'">
        <img class="order-people" src="./../../assets/images/order/order-people.png">
        <div class="order-userInfo">
          <span style="color: #333;font-size: 14px">{{orderData.techName}}</span>
          <span class="high-workman">高级技工</span>
          <div class="assess-more">
            <div class="more-img"></div>
            <div class="more-img"></div>
            <div class="more-img"></div>
            <div class="more-img"></div>
            <div class="more-img"></div>
          </div>
        </div>
        <img src="./../../assets/images/order/order-phone.png" alt="">
      </div>
      <div class="order-assess" v-if = "orderData.orderStatus =='7'">
        <div class="assess go-assess" @click="goAssess(orderData)">去评价</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrderBanner',
  data () {
    return {
      //
      srcData: '',
      orderData: '',
      isDone: false
    }
  },
  props: ['orderInfo'],
  created () {
    this.getOrder()
  },
  methods: {
    goAssess (orderData) {
      this.$router.push({
        name: 'OrderAssess',
        query: {
          orderInfo: orderData
        }
      })
    },
    getOrder () {
      let orderData = this.orderInfo
      console.log(orderData.orderStatus)
      switch (parseInt(orderData.orderStatus)) {
        case 1 :
        case 2 :
        case 3 :
        case 4 :
          this.srcData = 'order-bn-c'
          break
        case 5 :
          this.srcData = 'order-bn-tn'
          break
        case 6 :
          this.srcData = 'order-bn-or'
          break
        case 7 :
          this.srcData = 'order-bn-wait'
          break
        case 9 :
          this.srcData = 'order-bn-cp'
          break
      }
      this.orderData = orderData
      this.isDone = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner{
    margin-bottom: 10px;
  }
  .order-banner{
    width: 100%;
    height: 120px;
  }
  .order-banner>img,.order-banner>div{
    width: 100%;
    height: 100%;
  }
  .order-p{
    display: flex;
    background: #fff;
    align-items: center;
    /*padding: 10px 0px;*/
    height: 40px;
    font-size: 12px;
    color: rgb(141,141,141);
  }
  .order-bn-c{
    background-image: url(./../../assets/images/order/order-wait-car.png);
    background-size: 100%;
  }
  .order-bn-tn{
    background-image: url(./../../assets/images/order/order-technician.png);
    background-size: 100%;
  }
  .order-bn-or{
    background-image: url(./../../assets/images/order/order-technician.png);
    background-size: 100%;
  }
  .order-bn-wait{
    background-image: url(./../../assets/images/order/order-wait-evaluate.png);
    background-size: 100%;
  }
  .order-bn-cp{
    background-image: url(./../../assets/images/order/order-complete.png);
    background-size: 100%;
  }
  .order-p>img {
    vertical-align: middle;
    /*width: 21px;*/
    height: 21px;
    display: inline-block;
    padding: 0px 10px 0px 25px;
  }
  .order-technician{
    height: 90px;
    display: flex;
    background: #fff;
    align-items: center;
    /*padding: 10px 0px;*/
    font-size: 12px;
    color: rgb(141,141,141);
  }
  .order-people{
    width: 55px;
    height: 55px;
    margin-left: 25px;
  }
  .order-technician img:last-child{
    position: absolute;
    right: 42px;
  }
  .order-people div{
    flex: 1;
  }
  .order-userInfo{
    margin-left: 10px;
  }
  .high-workman{
    background: #FFF6F7;
    border: 1px solid #ED6575;
    width: 60px;
    height: 24px;
    font-size: 12px;
    margin-left: 6px;
  }
  .order-assess{
    width: 100%;
    background: #fff;
    text-align: center;
    padding-bottom: 10px;
  }
  .assess{
    width: 90px;
    height: 23px;
    line-height: 23px;
    border-radius: 3px 3px 3px 3px;
    color: #fff;
    font-size: 13px;
    margin: auto;
  }
  .go-assess{
    background: rgb(95, 197, 241);
  }
  .suc-assess{
    background: rgb(141, 141, 141);
  }
  .more-img{
    width: 16px;
    height: 16px;
    background-image: url(./../../assets/images/order/order-star.png);
    background-size: 100%;
  }
  .assess-more div{
    margin-top: 5px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
