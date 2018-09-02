<template>
  <div v-if="isDone">
    <!-- banner轮播 -->
    <HomeBanner/>
    <!-- 订单信息 -->
    <HomeOrder/>
    <!-- 服务区域 -->
    <HomeService/>
    <!-- 账户信息 -->
    <HomeAccount style="margin-bottom: 55px;"/>
    <!-- 底部导航栏 -->
    <HomeFooter :fromPage="'home'"/>
  </div>
</template>

<script>
import HomeBanner from './home-banner'
import HomeOrder from './home-order'
import HomeService from './home-service'
import HomeAccount from './home-account'
import HomeFooter from './home-footer'
import utils from '@/common/utils'
import Lockr from 'lockr'

export default {
  name: 'Home',
  components: {
    HomeBanner,
    HomeOrder,
    HomeService,
    HomeAccount,
    HomeFooter
  },
  data () {
    return {
      isDone: false
    }
  },
  created () {
    // 有code说明是刚进来，微信重定向过来的，需要先获取openid，code取自微信跳转url带参，最初请求地址在入口在公众号菜单栏
    // openid会存在本地，以后都从本地取，openid是唯一标示，一个客户对一个公众号只有一个唯一的openid，不随时间改变而改变
    let code = utils.getQueryString('code')
    if (code) {
      this.getOpenId(code)
    } else {
      let openid = Lockr.get('openid')
      this.queryHomeData(openid)
    }
  },
  methods: {
    // 获取openid
    getOpenId (code) {
      this.$store.commit('setHomeParams', {
        paramsKey: 'openIdParams',
        code: code
      })
      this.$store.dispatch('getOpenId')
        .then((data) => {
          // 重新刷新页面，以后的url都不带之前的参数，比如code，以免每次进主页都要去请求openid
          location.href = location.origin
        })
    },
    // 请求主页数据
    queryHomeData (openid) {
      this.$store.commit('setHomeParams', {
        paramsKey: 'homeDataParams',
        openid: openid
      })
      this.$store.dispatch('queryHomeData')
        .then((data) => {
          let result = data.result
          // 未注册，去注册页
          if (result === '0') {
            this.$router.push({
              name: 'Register'
            })
          // 未登录，去登录页
          } else if (result === '3') {
            this.$router.push({
              name: 'SignIn'
            })
          // 已登录
          } else if (result === '1') {
            this.isDone = true
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
