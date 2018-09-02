<template>
  <div class="service-order-footer">
    <div class="service-order-content">
      <div class="pay">实付款 ¥ <span v-text="allPrice.toFixed(2)"></span></div>
      <div class="submit" @click="submissionWashBeauty">提交订单</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ServiceOrderFooter',
  data () {
    return {
      //
    }
  },
  props: ['allPrice', 'submissionWashBeauty']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.service-order-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 90;
}
.service-order-content {
  display: flex;
}
.pay {
  flex: 4;
  height: 45px;
  background: #fff;
  color: #ed6575;
}
.pay>span {
  font-weight: bold;
}
.submit {
  flex: 2;
  height: 45px;
  background: #5dc3f4;
  color: #fff;
}
.pay, .submit {
  line-height: 45px;
  text-align: center;
}
</style>
