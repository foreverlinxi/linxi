<template>
  <div>
    <HomeFooter/>
  </div>
</template>

<script>
import HomeFooter from './home-footer'

export default {
  name: 'Home',
  components: {
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
