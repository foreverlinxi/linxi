<template>
  <div v-if="isDone">
    <!-- banner轮播 -->
    <OrderBanner :orderInfo="orderData"/>
    <OrderServerInfo v-if="orderData.orderStatus > 5" :orderInfo="orderData"/>
    <OrderSection :orderInfo="orderData"/>
    <OrderFooter :orderInfo="orderData"/>
  </div>
</template>

<script>
import OrderBanner from './order-banner'
import OrderSection from './order-section'
import OrderFooter from './order-footer'
import OrderServerInfo from './order-server-info'

export default {
  name: 'OrderIndex',
  components: {
    OrderBanner,
    OrderSection,
    OrderFooter,
    OrderServerInfo
  },
  data () {
    return {
      //
      orderData: {},
      isDone: false
    }
  },
  created () {
    this.queryOrderData()
  },
  methods: {
    queryOrderData () {
      this.$store.commit('setOrderParams', {
        paramsKey: 'setOrderParams',
        orderNo: this.$route.query.orderNo
      })
      this.$store.dispatch('queryOrderData')
        .then((data) => {
          console.log(data)
          this.orderData = data
          // this.orderData.orderStatus = 6
          // this.orderData.examineImage = [{imgUrl:'./../../assets/images/order/order-server.png'},{imgUrl:'./../../assets/images/order/order-server.png'},{imgUrl:'./../../assets/images/order/order-server.png'},{imgUrl:'./../../assets/images/order/order-server.png'}]
          this.isDone = true
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
