<template>
  <div v-if="isDone" style="background: #fff;">
    <!-- 当前城市 -->
    <LocationHeader v-if="showCity" :positionCity="positionCity" />
    <!-- 热门城市 -->
    <LocationFavouriteCity v-if="showCity" :changeSelectCity="changeSelectCity"/>
    <!-- 拼音 -->
    <LocationPinyin :changeSelectCity="changeSelectCity" :page="page" :positionCity="positionCity" :queryCtiy="queryCtiy"/>
  </div>
</template>

<script>
import LocationHeader from './location-header'
import LocationFavouriteCity from './location-favourite-city'
import LocationPinyin from './location-pinyin'

export default {
  name: 'Location',
  components: {
    LocationHeader,
    LocationFavouriteCity,
    LocationPinyin
  },
  data () {
    return {
      isDone: false,
      // 所选的城市id
      selectCityId: '',
      // 所选的小区id
      selectOrgId: '',
      showCity: false,
      page: 'village',
      // 城市中文名
      cityName: '',
      // 小区中文名
      orgName: '',
      // 定位出来的城市名，默认深圳市
      positionCity: '深圳市',
      // 定位出来的城市id，默认深圳市cityId
      positionCityId: '440300'
    }
  },
  created () {
    this.queryPositionCity()
  },
  methods: {
    // 调用腾讯定位获取城市名
    queryPositionCity () {
      let self = this
      /* eslint-disable */
      let geolocation = new qq.maps.Geolocation('OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77', 'myapp')
      geolocation.getLocation((position) => {
        self.queryVillage({
          // 城市编码,返回的有可能是区域级别的，如深圳市宝安区是440306，城市级别的最后两位都是00，所以强行改为城市级别的
          positionCityId: String(position.adcode).slice(0, -2) + '00',
          // 城市名
          positionCity: position.city
        })
        self.selectCityId = String(position.adcode).slice(0, -2) + '00'
      })
    },
    queryCtiy () {
      // 查询城市不需要入参
      this.$store.dispatch('queryCity')
        .then((data) => {
          this.showCity = true
          this.page = 'city'
        })
    },
    // 选择城市的id，入参查询小区
    changeSelectCity (objParams) {
      if (this.page === 'city') {
        this.selectCityId = objParams.cityId
        this.cityName = objParams.areaName
        // 查询该城市小区
        this.queryVillage({
          areaName: objParams.areaName
        })
      } else if (this.page === 'village') {
        this.selectOrgId = objParams.orgId
        this.orgName = objParams.villageName
        // 设置城市小区
        this.setCityVillage()
      }
    },
    // 查询小区
    queryVillage (opts) {
      this.$store.commit('setLocationParams', {
        paramsKey: 'queryVillageParams',
        cityId: opts.positionCityId || this.selectCityId
      })
      this.$store.dispatch('queryVillage')
        .then((data) => {
          if (!data.villageList || data.villageList.length <= 0) {
            this.$tip.show({
              message: '该城市暂无门店'
            })
          } else {
            this.showCity = false
            this.page = 'village'
            this.isDone = true
            // 查询是后面做的，所以先去查询的城市名，再去前面定位出来的城市名
            this.positionCity = opts.areaName || opts.positionCity
          }
        })
    },
    // 设置城市小区
    setCityVillage () {
      this.$store.commit('setLocationParams', {
        paramsKey: 'setCityVillageParams',
        cityId: this.selectCityId,
        orgId: this.selectOrgId
      })
      this.$store.dispatch('setCityVillage')
        .then((data) => {
          if (data.result === '1') {
            // 更新store中主页返回的数据
            this.$store.commit('setUpdateLocation', {
              cityId: this.cityId,
              orgId: this.selectOrgId,
              cityName: this.cityName,
              orgName: this.orgName
            })
            // 返回的地址
            let returnPage = this.$route.query.returnPage
            if (returnPage && returnPage === 'ServiceOrderIndex') {
              this.$router.replace({
                name: 'ServiceOrderIndex',
                query: {
                  serverType: this.$route.query.serverType
                }
              })
            } else {
              this.$router.replace({
                name: 'Home'
              })
            }
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
