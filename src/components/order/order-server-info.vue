<template>
  <div>
    <div class="order-server">
      <div class="order-flex order-place">
        <div>钥匙柜地点：</div>
        <div class="rt">{{orderInfo.deviceAddress}}</div>
      </div>
      <div class="line"></div>
      <div class="order-flex order-place">
        <div>停车位置：</div>
        <div class="rt">{{orderInfo.vehicleLocation}}</div>
      </div>
      <div class="line"></div>
      <div class="order-flex wait-car-photo">
        <div class="">停车照片:</div>
        <img class="stop-car" v-bind:src="orderInfo.parkImage">
      </div>
    </div>
    <div class="order-finish" v-if="orderInfo.orderStatus >= 8">
      <div class="finish-text">技师完成图片</div>
      <div class="finish-img">
        <img class="finish-car" v-for="item in orderInfo.completeImage" :key="item.index" v-bind:src="item">
        <!-- <img class="finish-car" src="./../../assets/images/order/order-server.png">
        <img class="finish-car" src="./../../assets/images/order/order-server.png">
        <img class="finish-car" src="./../../assets/images/order/order-server.png"> -->
      </div>
    </div>
    <div class="order-finish" v-if="orderInfo.orderStatus > 5">
      <div class="finish-text">技师验车图片</div>
      <div class="finish-img">
        <img class="finish-car" v-for="item in orderInfo.examineImage" :key="item.index" v-bind:src="item.imgUrl">
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'OrderServerInfo',
  data () {
    return {
      //
    }
  },
  props: ['orderInfo'],
  created () {
    // console.log(11111)
  },
  methods: {
  }
}
</script>

<style scoped>
  .order-flex{
    display: flex;
    align-items: center;
  }
  .order-server{
    background: #fff;
    margin-bottom: 10px;
    height: 170px;
    font-size: 14px;
    padding: 0px 12px;
  }
  .order-place{
    height: 35px;
  }
  .rt{
    flex: 1;
    text-align: right;
  }
  .line{
    height: 1px;
    width: 98%;
    margin: auto;
    background: #f0f0f0;
  }
  .wait-car-photo{
    height: 100px;
  }
  .stop-car{
    width: 75px;
    height: 75px;
    margin-left: 20px;
  }
  .order-finish{
    background: #fff;
    margin-bottom: 10px;
    padding: 0px 12px;
  }
  .finish-car{
    width: 75px;
    height: 75px;
    margin-left: 8px;
    margin-bottom: 8px;
  }
  .finish-text{
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
  .finish-img{
    text-align: left;
  }
</style>
