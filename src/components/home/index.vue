<template>
  <div>
    <HomeOrder/>
    <HomeAccount/>
    <HomeFooter/>
  </div>
</template>

<script>
import HomeOrder from './home-order'
import HomeAccount from './home-account'
import HomeFooter from './home-footer'

export default {
  name: 'Home',
  components: {
    HomeOrder,
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
