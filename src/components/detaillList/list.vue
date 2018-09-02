<template>
  <div>
    <div v-if=" menu == 'consume' ">
      <div class="list" v-for="(csp, index) in consumptionList" :key="index">
        <div class="list_left">
          <input type="text" class="left_name" disabled :value="csp.payName" >
          <div class="left_date">{{csp.payDate}}</div>
        </div>
        <div class="list_right">
          <input type="text" disabled :value="csp.payMoney + '元' " >
        </div>
      </div>
    </div>
    <div v-else-if=" menu == 'buy' ">
      <div class="list" v-for="(pht, index) in purchaseList" :key="index">
        <div class="list_left">
          <input type="text" class="left_name" disabled :value="pht.buyName" >
          <div class="left_date">{{pht.buyDate}}</div>
        </div>
        <div class="list_right">
          <input type="text" disabled :value="pht.buyMoney + '元' " >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'page_list',
  props: ['menu'],
  data: function () {
    return {
      usable: true,
      consumptionList: '',
      purchaseList: ''
    }
  },
  created () {
    this.queryConsumptionData()
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    queryConsumptionData () {
      this.$store.commit('setConsumptionParams', {
        paramsKey: 'consumptionParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryConsumptionData')
        .then((data) => {
          this.consumptionList = data.consumptionList
          this.purchaseList = data.purchaseList
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list{
    background: #fff;
    font-size: 11px;
    padding: 0 20px;
    display: -webkit-flex;
    display: flex;
    border-bottom: 2px solid #f0f0f0;
  }
  .list_left{
    height: 60px;
    flex:1;
  }
  .left_name{
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    margin-top: 10px;
    background: transparent;
    width: 100%;
  }
  .left_date{
    color: #8d8d8d;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    margin-bottom: 10px;
  }
  .list_right{
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    width: 70px;
  }
  .list_right>input{
    color: #ed6575;
    text-align: right;
    background: transparent;
    font-size: 14px;
    width:100%;
  }
</style>
