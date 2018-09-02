<template>
  <div>
    <!-- 拼音首字母部分 -->
    <div class="location-pinyin">
      <div class="title">
        <span>{{page === 'city' ? '更多城市' : '请选择您的小区'}}</span>
      </div>
      <div class="pinyin-area">
        <div class="left"></div>
        <div class="middle">
          <div class="city-village-name" v-if="page === 'village'">
            <span @click="goSelectCity">
              <span class="location-city">当前城市:</span>
              <span class="city-name">{{positionCity}}</span>
            </span>
            <span class="location-city" style="margin-left: 50px;">小区:</span>
            <span class="city-name">{{getHomeData.orgName}}</span>
          </div>
          <ul class="pinYin-ul" v-for="(itemList, index) in pinYinList" :key="index">
            <li class="pinYin-li" :class="index !== 7 ? 'flex' : ''" v-for="(items, index) in itemList" :key="index" @click="goAnchor(items[0].pinYin)">
              <LocationPinyinItem :itemClassName="JSON.stringify(items) !== '{}' ? items[0].pinYin : 'null'"/>
            </li>
          </ul>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <!-- 拼音字母类下面的所有城市 -->
    <div class="pinYin-block">
      <ul class="pinYin-block-ul" v-for="(itemList, index) in pinYinBlockList" :key="index">
        <div class="title" :id="itemList[0][0].pinYin">
          <span>{{itemList[0][0].pinYin}}</span>
        </div>
        <div style="display: flex;">
          <div class="left"></div>
          <div class="pinYin-block-middle">
            <ul class="pinYin-block-middle-ul" v-for="(itemListChild, index) in itemList" :key="index">
              <li class="pinYin-block-li" :class="index !== 3 ? 'flex' : ''" v-for="(items, index) in itemListChild" :key="index" @click="changeSelectCity({cityId:items.cityId, areaName: items.areaName, villageName: items.villageName, orgId: items.orgId})">
                <LocationCityItem :itemObj="items" :itemType="page === 'city' ? 'city' : 'village'"/>
              </li>
            </ul>
          </div>
          <div class="right"></div>
        </div>
      </ul>
    </div>
    <div class="space"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LocationPinyinItem from './location-pinyin-item'
import LocationCityItem from './location-city-item'
import utils from '@/common/utils'

export default {
  name: 'locationPinyin',
  data () {
    return {
      pinYinList: [],
      pinYinBlockList: []
    }
  },
  components: {
    LocationPinyinItem,
    LocationCityItem
  },
  props: ['changeSelectCity', 'page', 'positionCity', 'queryCtiy'],
  created () {
    this.cityDataFormat(this.getVillage.villageList, 'pinYin')
  },
  watch: {
    page (val) {
      if (val === 'village') {
        this.cityDataFormat(this.getVillage.villageList, 'pinYin')
      } else if (val === 'city') {
        let arr = this.getCity.cityList
        let len = arr.length - 1
        for (var i = len; i >= 0; i--) {
          if (!arr[i].pinYin) {
            arr.splice(i, 1)
          }
        }
        this.cityDataFormat(arr, 'pinYin')
      }
    }
  },
  computed: {
    ...mapGetters({
      getCity: 'getCity',
      getVillage: 'getVillage',
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    // 城市数据格式化
    cityDataFormat (list, key) {
      // 将数组按照pinYin属性排序
      let listSort = list.sort(this.compare(key))
      // 同属于一个字母下面的元素分组
      let allList = []
      let listChild = []
      listSort.forEach((item) => {
        if (JSON.stringify(listChild) === '[]') {
          listChild.push(item)
        } else if (listChild[listChild.length - 1].pinYin === item.pinYin) {
          listChild.push(item)
        } else if (listChild[listChild.length - 1].pinYin !== item.pinYin) {
          allList.push(listChild)
          listChild = []
          listChild.push(item)
        }
      })
      allList.push(listChild)
      let arr = []
      allList.forEach((item) => {
        arr.push(this.addNullObj(item, 3))
      })
      this.pinYinBlockList = arr
      this.pinYinList = this.addNullObj(allList, 8)
    },
    // 比较规整，按照pinYin属性的字母排序
    compare (property) {
      return function (a, b) {
        let val1 = a[property]
        let val2 = b[property]
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    },
    // 添加空对象
    addNullObj (list, num) {
      let arr = utils.incisionArray(list, num)
      let arrLastItem = arr[arr.length - 1]
      let arrLastItemLength = arrLastItem.length
      if (arrLastItemLength < num) {
        for (let j = num; j > arrLastItemLength; j--) {
          arrLastItem.push({})
        }
      }
      return arr
    },
    // 锚点定位
    goAnchor (selector) {
      let anchor = this.$el.querySelector('#' + selector)
      document.body.scrollTop = anchor.offsetTop
    },
    // 手动选择城市
    goSelectCity () {
      this.queryCtiy()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.left, .right {
  width: 15px;
}
.pinyin-area {
  display: flex;
}
.middle {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.pinYin-ul {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.pinYin-li {
  list-style:none;
}
.flex {
  flex: 1;
}
.pinYin-block {

}
.pinYin-block-middle {
  flex: 1;
  display: flex;
  margin-right: -18px;
  flex-direction: column;
}
.pinYin-block-ul {
  margin-top: 15px;
}
.pinYin-block-li {
  list-style:none;
}
.pinYin-block-middle-ul {
  display: flex;
  width: 100%;
}
.space {
  height: 15px;
}
.city-village-name {
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
}
.location-city {
  color: #8d8d8d;
}
.city-name {
  color: #5ac4f3;
}
</style>
