<template>
<div>
  <div class="footer_margin"></div>
  <div class="footer">
    <div class="footer_text">购买<span class="footer_red">{{pack.dinnerMoney}}元</span>养车套餐卡</div>
    <div class="footer_btn" @click="buyDinner(pack)">立即充值</div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import weChatPay from '@/common/weChatPay'

export default {
  name: 'page_head',
  props: ['pack'],
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    buyDinner (pack) {
      let self = this
      self.$store.commit('isLoading', true)
      weChatPay({
        body: '套餐卡-' + pack.dinnerName,
        totalFee: pack.dinnerMoney,
        userId: self.getHomeData.userId,
        code: '3',
        dinnerId: pack.dinnerId,
        orgId: self.getHomeData.orgId,
        price: pack.dinnerMoney
      }, function () {
        // this.$store.commit('isLoading', false)
        self.$router.replace({
          name: 'CardPack'
        })
      }, self)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer_margin{
  height: 50px;
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
  font-size: 12px;
}
.footer_red{
  color: #ed6575;
}
.footer_btn{
  flex: 1;
  height: 45px;
  line-height: 45px;
  font-size: 19px;
  vertical-align: middle;
  text-align: center;
  background: #5ac4f3;
  color: #ffffff;
}
</style>
