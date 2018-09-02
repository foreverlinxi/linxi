<template>
  <div class="location-header">
    <span class="location-city">当前城市:</span>
    <span class="city-name">{{positionCity}}</span>
  </div>
</template>

<script>
export default {
  name: 'LocationHeader',
  data () {
    return {
      //
    }
  },
  props: ['positionCity']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location-header {
  height: 45px;
  text-align: center;
  line-height: 45px;
}
.location-city {
  color: #8d8d8d;
}
.city-name {
  color: #5ac4f3;
}
</style>
