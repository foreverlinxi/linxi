<template>
  <div class="page_container">
    <div v-for="(itme, index) in unrecList" :key="index" class="list usable">
      <div class="list_left ">
        <div class="left_money">￥<span>{{itme.couponMoney}}</span></div>
        <div class="left_text">
          <div class="left_text_big">{{itme.couponGood}}</div>
          <div class="left_text_small">{{itme.couponOrgName}}</div>
        </div>
      </div>
      <div class="list_img">
        <img src="../../assets/images/personal/core-red-gear.png">
      </div>
      <div class="list_right" @click="getCoupon(itme.couponId)">
        <div class="data_margin">立刻</div>
        <div>使用</div>
        <input class="exp_data" disabled :value="itme.expiryTime
 +'前使用' ">
      </div>
    </div>
    <div v-if="!unrecList || unrecList.length===0" class="no_coupon">没有待领取的优惠券</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list',
  data: function () {
    return {
      unrecList: []
    }
  },
  created () {
    this.queryUnerCouponData()
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    queryUnerCouponData () {
      this.$store.commit('setUnerCouponParams', {
        paramsKey: 'unerCouponDataParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryUnerCouponData')
        .then((data) => {
          this.unrecList = data.unrecList
        })
    },
    getCoupon (id) {
      this.$store.commit('setObtainCouponParams', {
        paramsKey: 'obtainCouponParams',
        userId: this.getHomeData.userId,
        couponId: id,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('obtainCoupon')
        .then((data) => {
          if (data.result && data.result === '1') {
            // this.queryUnerCouponData()
            this.$router.replace({name: 'Coupon'})
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page_container{
    background: #f0f0f0;
    padding: 10px 10px 0 10px;
  }
  .list{
    height: 70px;
    margin-bottom:10px;
    display: -webkit-flex;
    display: flex;
  }
  .list_left{
    flex: 1;
    display: -webkit-flex;
    display: flex;
  }
  .usable{
    background: #ed6575;
    color: #fff;
  }
  .usable .left_text_small{
    color: #fbe6e8;
  }
  .usable .list_right{
    background: #e8bd42;
  }
  .used_or_over{
    background: #fff;
    color: #3d3d3d;
  }
  .used_or_over .left_text_small{
    color: #a7a7a7;
  }
  .used_or_over .exp_data{
    color: #818181;
  }
  .used_or_over .list_right{
    background: #d8d8d8;
  }
  .left_money{
    display: inline-block;
    margin-left: 4px;
    height: 70px;
    line-height: 70px;
    vertical-align: middle;
    font-size: 22px;
    font-weight: bold;
  }
  .left_text{
    flex: 1;
    text-align: center;
  }
  .left_text_big{
    margin-top: 18px;
    font-size: 16px;
  }
  .left_text_small{
    font-size: 12px;
  }
  .list_img{
    height: 70px;
    width: 10px;
  }
  .list_img>img{
    height: 100%;
    width: 100%;
    margin-right: -2px;
  }
  .list_right{
    width: 118px;
    height: 100%;
    text-align: center;
    font-size: 16px;
    color: #000;
    font-weight: bold;
    position: relative;
  }
  .used_img{
    position: absolute;
    left: -35px;
    top: 3px;
    height: 64px;
    width: 64px;
  }
  .data_margin{
    margin-top: 6px;
  }
  .exp_data{
    font-size: 12px;
    color: #857a5f;
    font-weight: normal;
    background: transparent;
    width: 100%;
    text-align: center;
  }
  .no_coupon{
    height: 200px;
    line-height: 200px;
    text-align: center;
    background: #fff;
    color: #999;
  }
</style>
