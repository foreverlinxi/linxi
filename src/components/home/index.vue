<template>
  <div>
    <HomeBanner/>
    <HomeOrder/>
    <HomeService/>
    <HomeAccount/>
    <HomeFooter/>
  </div>
</template>

<script>
import HomeBanner from './home-banner'
import HomeOrder from './home-order'
import HomeService from './home-service'
import HomeAccount from './home-account'
import HomeFooter from './home-footer'

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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
