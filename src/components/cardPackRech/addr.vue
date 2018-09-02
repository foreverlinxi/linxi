<template>
  <div class="main_head">
    <div>请选择充值卡的小区</div>
    <div class="main_add">
      <div class="add_city">
        <span>城市：</span>
        <span class="city_name" @click="selectCity">{{getHomeData.cityName}}</span>
        <span class="Down_allow" @click="selectCity"></span>
      </div>
      <div>
        <span>小区：</span>
        <span @click="selectCity">
        <input  disabled class="house_input" type="text" name="" :value="getHomeData.orgName" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'page_head',
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    selectCity: function () {
      this.$router.push({
        name: 'Location'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  border-style: none;
}
.main_head{
  padding-left: 10px;
  height: 70px;
  background: #ecfaff;
  margin-bottom: 5px;
  font-size: 12px;
  color: #8d8d8d;
}
.main_head>div{
  height: 35px;
  line-height: 35px;
  vertical-align: middle;
}
.main_add{
  display: -webkit-flex;
  display: flex;
  font-size: 16px;
}
.add_city{
  flex:1;
}
.city_name{
  color: #5ac4f3;
}
.Down_allow{
  margin-left: 6px;
  display: inline-block;
  border-top: 8px solid #5ac4f3;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.house_input{
  width: 80px;
  background: transparent;
  color: #5ac4f3;
  font-size: 14px;
}
</style>
