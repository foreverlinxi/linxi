<template>
  <div class="home-order">
    <div class="left"></div>
    <div class="content">
      <div class="order-num"><span>订单号：2218040439091749490</span></div>
      <div class="order-content">
        <div class="progress">
          <span>下单成功</span>
          <img src="./../../assets/images/home/progress.png"/>
          <span>待付款</span>
        </div>
        <div class="title">回家精洗</div>
        <div class="location">停车位置：A区2单元负一楼停车场H67车位</div>
        <div class="button"><span>立即支付</span></div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeOrder',
  data () {
    return {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-order {
  margin-top: 10px;
  margin-bottom: 10px;
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
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  color: #000000;
}
.progress>img {
  height: 10px;
  width: 92px;
  margin-left: 7px;
  margin-right: 7px;
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
