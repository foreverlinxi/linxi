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
.home-banner {
  padding-top: 10px;
  background: #fff;
  width: 100%;
  height: 190px;
  display: flex;
}
.left, .right{
  width: 10px;
}
.picture {
  flex: 1;
  height: 152px;
  border-radius: 5px;
}
.banner{
  height: 100%;
  width: 100%;
}
.location {
  margin-top: 4px;
  text-align: center;
}
.location-logo {
  width: 8.5px;
  height: 13px;
}
.picture span {
  font-size: 14px;
  color: #8d8d8d;
  vertical-align: top;
}
.city, .address {
  display: inline-block;
  margin-top: 1px;
}
.address {
  margin-left: 5px;
}
</style>
