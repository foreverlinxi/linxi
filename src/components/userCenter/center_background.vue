<template>
  <div class="home-banner">
    <div class="left"></div>
    <div class="picture">
      <img class="banner" src="./../../assets/images/home/banner.png" />
      <div class="location">
        <img class="location-logo" src="./../../assets/images/home/location.png" />
        <span class="city">深圳市</span>
        <span class="address">华府国际</span>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner',
  data () {
    return {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head_img{
    width: 100%;
    height: 150px;
  }
</style>
