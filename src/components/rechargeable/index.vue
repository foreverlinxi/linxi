<template>
  <div>
    <PageHead v-bind:balance="myBalance" :bodycolor="changeBodyColor" />
    <div class="main">
      <Addr v-bind:orgname="orgName"  v-bind:city="city" v-bind:pagename="pageName"  />
      <CardList v-bind:balancelist="balanceList" @selectedlist="selectedCard" />
      <Pagefooter v-bind:pricedata="footerMoney"  />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHead from './page_head'
import Addr from '../cardPackRech/addr'
import CardList from './card_list'
import Pagefooter from './page_footer'

export default {
  name: 'rechargeable',
  components: {
    PageHead,
    Addr,
    CardList,
    Pagefooter
  },
  data: function () {
    return {
      myBalance: '1200.00',
      pageName: 'Rech',
      balanceList: [
        // {
        //   balanceId: '1',
        //   price: '500',
        //   sendPrice: '100',
        //   factPrice: '600',
        //   name: 'underfine'
        // },
        // {
        //   balanceId: '2',
        //   price: '900',
        //   sendPrice: '300',
        //   factPrice: '1200',
        //   name: 'underfine'
        // },
        // {
        //   balanceId: '3',
        //   price: '1500',
        //   sendPrice: '400',
        //   factPrice: '1900',
        //   name: 'underfine'
        // },
        // {
        //   balanceId: '2',
        //   price: '900',
        //   sendPrice: '300',
        //   factPrice: '1200',
        //   name: 'underfine'
        // }
      ],
      orgName: '华府国际',
      city: '深圳',
      index: '0'
    }
  },
  computed: {
    footerMoney: function () {
      return this.balanceList[this.index]
    },
    changeBodyColor () {
      document.body.style.background = '#fff'
      return 'fff'
    },
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  created () {
    this.queryBalanceData()
  },
  methods: {
    selectedCard (index) {
      this.index = index
    },
    queryBalanceData () {
      this.$store.commit('setBalanceParams', {
        paramsKey: 'balanceParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryBalanceData')
        .then((data) => {
          this.balanceList = data.balanceList
          this.myBalance = data.myBalance
          console.log(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  padding: 20px 20px 0 20px;
  background: #fff;
}
</style>
