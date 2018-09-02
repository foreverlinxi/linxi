<template>
  <div style="margin-top: 15px;" v-if="isDone">
    <div class="address">
      <div class="rt"></div>
      <div class="content">
        <div class="present">当前默认小区:</div>
        <div class="house bg" @click="goChooseCity">
          <div class="house-img"><img class="" :src="nowAdree.logo" alt=""></div>
          <div>
            <div class="house-title">{{nowAdree.villageName}}</div>
            <div class="addree-house">地址： {{nowAdree.address}}</div>
          </div>
        </div>
      </div>
      <div class="rt"></div>
    </div>
    <div class="address">
      <div class="rt"></div>
      <div class="content">
        <div class="present">历史选择小区:</div>
        <div class="house bf" v-for="(sites, index) in adreeList" :key="sites.index" @click="cutAddress(sites, index)">
          <div class="house-img"><img :src="sites.logo" alt=""></div>
          <div>
            <div class="house-title">{{sites.villageName}}</div>
            <div class="addree-house" style="color: #747474;">地址： {{sites.address}}</div>
          </div>
        </div>
      </div>
      <div class="rt"></div>
    </div>
    <div class="add-sub" @click="goChooseCity">切换小区</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IMGBASEURL } from '../../store/url'

export default {
  name: 'AddressList',
  data () {
    return {
      nowAdree: {
        addrss: '深圳市宝安区'
      },
      adreeList: [{
        addrss: '深圳市南山区'
      }],
      isDone: false
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  created () {
    this.queryCheckData()
  },
  methods: {
    queryCheckData () {
      this.$store.commit('setHistoryParams', {
        paramsKey: 'adreePames',
        // orgId: this.getHomeData.orgId
        orgId: '12'
      })
      this.$store.dispatch('queryHistoryData')
        .then((data) => {
          this.nowAdree = data
          data.villageHistoryList.forEach((item) => {
            // if (item.logo) {
            item.logo = IMGBASEURL + item.logo
            // } else {
            // item.logo = './../../assets/images/meal/house.png'
            // }
          })
          this.adreeList = data.villageHistoryList
          this.isDone = true
        })
    },
    goChooseCity () {
      this.$router.push({
        name: 'Location'
      })
    },
    cutAddress (sites, index) {
      console.log(sites)
      // this.adreeList.push(this.nowAdree)
      this.$store.commit('setLocationParams', {
        paramsKey: 'setCityVillageParams',
        cityId: sites.cityId,
        orgId: sites.orgId
      })
      this.$store.dispatch('setCityVillage')
        .then((data) => {
          this.nowAdree = sites
          this.$store.commit('setUpdateLocation', {
            cityId: sites.cityId,
            orgId: sites.orgId,
            cityName: sites.cityName,
            orgName: sites.villageName
          })
        })
    }
  }
}
</script>

<style scoped>
.address{
  display: flex;
  margin-bottom: 15px;
}
.rt{
  width: 10px;
}
.bg{
  background: #5AC4F3;
  color: #fff;
}
.content{
  flex: 1;
  height: 140px;
}
.present{
  font-size: 11px;
}
.house{
  margin-top: 15px;
  padding: 10px 5px;
  vertical-align: middle;
  display: flex;
  align-items: center;
}
.house-img{
  width: 125px;
  height: 84px;
  display: inline-block;
  margin-right: 25px;
}
.house-img>img{
  width: 100%;
  height: 100%;
}
.house>div{
  display: inline-block;
}
.house-title{
  font-size: 16px;
  margin-bottom: 16px;
}
.addree-house{
  font-size: 12px;
}
.add-sub{
  width: 90%;
  text-align: center;
  margin: auto;
  margin-top: 50px;
  height: 44px;
  line-height: 44px;
  border-radius: 5px;
  color: #fff;
  background: rgb(95, 197, 241);
}
.bf{
  background: #fff;
}
</style>
