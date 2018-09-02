<template>
  <div class="outer">
    <PageHead  v-bind:orgname="getShopName.shopName" />
    <Money v-bind:mybalance="myBalance" />
    <div class="btn" @click="goPage('Rech')">去充值</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHead from './page_head'
import Money from './money'

export default {
  name: 'rechCard',
  data: function () {
    return {
      myBalance: '1200.00'
    }
  },
  components: {
    PageHead,
    Money
  },
  created () {
    this.queryBalanceListData()
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    }),
    getShopName () {
      return {
        shopName: this.getHomeData.cityName + this.getHomeData.orgName
      }
    }
  },
  methods: {
    goPage (pageName) {
      this.$router.push({
        name: pageName
      })
    },
    queryBalanceListData () {
      this.$store.commit('setBalanceListParams', {
        paramsKey: 'balanceListDataParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryBalanceListData')
        .then((data) => {
          this.myBalance = data.myBalance
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer{
  padding: 10px;
  font-size: 14px;
  color: #8d8d8d;
}
.btn{
  margin: 0 15px;
  height: 45px;
  line-height: 45px;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  font-size: 22px;
  border-radius: 4px;
  background: #5ac4f3;
}
</style>
