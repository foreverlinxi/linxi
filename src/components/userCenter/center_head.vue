<template>
  <div class="main_head">
    <div class="main_headRow1">
      <div class="user_jpg">
        <img :src="userdata.img">
      </div>
      <div class="user_inf">
        <div class="user_name">{{userdata.userName}}</div>
        <div class="user_phone">{{userdata.phone}}</div>
      </div>
      <div class="change_userInfo">
        <img @click="goPage('ChangePhone')" src="../../assets/images/personal/personal-write.png" >
      </div>
    </div>
    <div class="main_headRow2">
      <div class="head_text" @click="goPage('RechCard')">{{userdata.balance}}</div>
      <div class="head_text" @click="goPage('CardPack')">{{userdata.dinnerNum}}</div>
      <div class="head_text" @click="goPage('Coupon')">{{userdata.couponNum}}</div>
    </div>
    <div class="main_headRow3">
      <div class="head_text">充值卡</div>
      <div class="head_text">套餐券</div>
      <div class="head_text">优惠劵</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'center_head',
  props: ['userdata'],
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    }),
    // 是否有小区地址返回
    hasShopName () {
      return this.getHomeData.orgName && this.getHomeData.orgId
    }
  },
  methods: {
    goPage (pageName) {
      if ((pageName === 'RechCard' || pageName === 'CardPack') && this.goSelectLocation()) return
      this.$router.push({
        name: pageName
      })
    },
    // 去选择地址页面
    goSelectLocation () {
      console.log('11')
      if (!this.hasShopName) {
        this.$dialog.show({
          message: '请先选择您的服务地址',
          confirmCallback: () => {
            this.$router.push({
              name: 'Location'
            })
          }
        })
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main_head{
  border-radius: 8px;
  background: white;
  padding: 0 15px;
  margin-bottom: 15px;
}
.main_headRow1{
  height: 75px;
  display: -webkit-flex;
  display: flex;
}
.user_jpg{
  width: 80px;
  height: 100%;
  border-radius: 4px;
}
.user_jpg>img{
  width: 80px;
  height: 80px;
  margin-top: -15px;
  border-radius: 4px;
}
.user_inf{
  flex:1;
  height: 75px;
  padding-left: 15px;
  padding-top: 15px;
}
.user_name{
  display: inline-block;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #656565;
}
.user_phone{
  display: inline-block;
  width: 100%;
  font-size: 11px;
  color: #8d8d8d;
}
.change_userInfo{
  width: 32px;
  height: 75px;
  line-height: 75px;
  vertical-align: middle;
  margin-right: 25px;
}
.change_userInfo>img{
  width: 32px;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  border-radius: 50%;
}
.main_headRow2{
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #ed6575;
  display: -webkit-flex;
  display: flex;
  text-align: center;
}
.head_text{
  flex: 1;
}
.main_headRow3{
  height: 25px;
  font-size: 14px;
  display: -webkit-flex;
  display: flex;
  text-align: center;
  color: #808080;
}

</style>
