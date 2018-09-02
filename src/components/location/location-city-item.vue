<template>
  <div>
    <div v-if="itemObj.pinYin" class="location-city-item" :class="itemObj.isActive ? 'active' : ''" v-text="itemType === 'city' ? itemObj.shortName : itemObj.villageName "></div>
    <div v-else class="space"></div>
  </div>
</template>

<script>

export default {
  name: 'locationCityItem',
  data () {
    return {
      //
    }
  },
  props: ['itemObj', 'itemType'],
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location-city-item {
  flex: 1;
  height: 33px;
  background: #fff;
  margin-right: 18px;
  margin-top: 18px;
  text-align: center;
  line-height: 35px;
  font-size: 12px;
  color: #8d8d8d;
  border: 1px solid #5ac4f3;
}
.active {
  background: #5ac4f3;
  color: #fff;
}
.space {
  flex: 1;
  height: 35px;
}
</style>
