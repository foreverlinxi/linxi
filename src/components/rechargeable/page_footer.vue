<template>
<div>
  <div class="footer_margin"></div>
  <div class="footer">
    <div class="footer_text">充<span class="footer_red">{{pricedata.price}}得{{pricedata.factPrice}}元</span>回家养车卡</div>
    <div class="footer_btn" @click="buyBalance(pricedata)">立即充值</div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import weChatPay from '@/common/weChatPay'

export default {
  name: 'page_footer',
  props: ['pricedata'],
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    buyBalance (pricedata) {
      let self = this
      console.log(pricedata)
      self.$store.commit('isLoading', true)
      weChatPay({
        body: '充值卡-充' + pricedata.price + '送' + pricedata.factPrice,
        totalFee: pricedata.price,
        userId: self.getHomeData.userId,
        code: '2',
        price: pricedata.price,
        sendPrice: pricedata.sendPrice,
        factPrice: pricedata.factPrice,
        balanceId: pricedata.balanceId,
        orgId: self.getHomeData.orgId
      }, function (data) {
        // this.$store.commit('isLoading', false)
        self.$router.replace({
          name: 'RechCard'
        })
      }, self)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer_margin{
  height: 55px;
}
.footer{
  height: 45px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  border-top: 1px solid #dcdcdc;
  background: #fff;
}
.footer_text{
  flex: 1.5;
  height: 45px;
  line-height: 45px;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  color: #8d8d8d;
}
.footer_red{
  color: #ed6575;
}
.footer_btn{
  flex: 1;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  vertical-align: middle;
  text-align: center;
  background: #5ac4f3;
  color: #ffffff;
}
</style>
