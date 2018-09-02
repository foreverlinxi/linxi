<template>
  <div class="page">
    <PageHead :bodycolor="changeBodyColor"  />
    <div class="main">
      <Addr :homedata="getHomeData" />
      <PageList @changeSelect="changeSelected" :packagelist="packageList" />
      <Btn :pack="selectedPack" :packagelist="packageList" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHead from './pageHead'
import PageList from './pageList'
import Addr from './addr'
import Btn from './btn'

export default {
  name: 'cardPackRech',
  components: {
    PageHead,
    PageList,
    Addr,
    Btn
  },
  data: function () {
    return {
      selectedPack: {},
      packageList: []
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  created () {
    this.queryOrgDinnerData()
  },
  methods: {
    changeSelected: function (index) {
      this.selectedPack = this.packageList[index]
    },
    changeBodyColor () {
      document.body.style.background = '#fff'
      return 'fff'
    },
    queryOrgDinnerData () {
      this.$store.commit('setOrgDinnerParams', {
        paramsKey: 'orgDinnerParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryOrgDinnerData')
        .then((data) => {
          let obj = {}
          for (let item of data.dinnerList) {
            if (obj[item.dinnerId]) {
              let a = {
                goodsId: item.goodsId,
                goodsName: item.goodsName,
                goodsNum: item.goodsNum
              }
              obj[item.dinnerId].list.push(a)
            } else {
              obj[item.dinnerId] = {
                dinnerName: item.dinnerName,
                dinnerId: item.dinnerId,
                dinnerMoney: item.dinnerMoney,
                list: [
                  {
                    goodsId: item.goodsId,
                    goodsName: item.goodsName,
                    goodsNum: item.goodsNum
                  }
                ]
              }
            }
          }
          let arr = []
          for (let b in obj) {
            arr.push(obj[b])
          }
          this.selectedPack = arr[0]
          this.packageList = arr
          console.log(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page{
  font-size: 14px;
  color: #8d8d8d;
}
.main{
  padding: 20px 20px 0 20px;
  background: #fff;
}
</style>
