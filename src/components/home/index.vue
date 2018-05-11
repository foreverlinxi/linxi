<template>
  <div>
    <HomeBanner/>
    <HomeOrder/>
    <HomeService/>
    <HomeAccount style="margin-bottom: 55px;"/>
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
      //
    }
  },
  created () {
    this.queryHomeData()
  },
  methods: {
    queryHomeData () {
      this.$store.commit('setHomeParams', {
        paramsKey: 'homeDataParams',
        payApplyNo: '1111111'
      })
      this.$store.dispatch('queryHomeData')
        .then((data) => {
          console.log(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
