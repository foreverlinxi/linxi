<template>
  <div class="location-favourite-city">
    <div class="title">
      <span>热门城市</span>
    </div>
    <div class="city-area">
      <div class="left"></div>
      <div class="middle">
        <ul style="display: flex;" v-for="itemList in cityList" :key="itemList.index">
          <li style="list-style:none;flex: 1;" v-for="items in itemList" :key="items.index" @click="changeSelectCity({cityId:items.cityId, areaName: items.areaName, orgId: items.orgId})">
            <LocationCityItem :itemObj="items" :itemType="'city'"/>
          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LocationCityItem from './location-city-item'
import utils from '@/common/utils'

export default {
  name: 'locationFavouriteCity',
  data () {
    return {
      cityList: []
    }
  },
  props: ['changeSelectCity'],
  components: {
    LocationCityItem
  },
  computed: {
    ...mapGetters({
      getCity: 'getCity'
    })
  },
  created () {
    this.formatCityList()
  },
  methods: {
    formatCityList () {
      let arr = []
      // 匹配出热门城市数据
      let favouriteCity = ['深圳', '广州', '北京', '太原', '济南', '珠海', '武汉', '上海', '南京']
      this.getCity.cityList.forEach((item) => {
        favouriteCity.forEach((city) => {
          if (city === item.shortName) {
            arr.push(item)
          }
        })
      })
      this.cityList = utils.incisionArray(arr, 3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location-favourite-city {
  height: 206px;
}
.title {
  height: 26px;
  background: #f2f2f2;
  line-height: 25px;
}
.title>span {
  margin-left: 16px;
  font-size: 11px;
  color: #3d3d3d;
}
.city-area {
  display: flex;
  height: 180px;
}
.left, .right {
  width: 20px;
}
.middle {
  flex: 1;
  display: flex;
  margin-right: -18px;
  flex-direction: column;
}
</style>
