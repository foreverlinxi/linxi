<template>
  <div>
    <Menu :coupon="coupon" :menuname="menuName" @changMenu="menuChange"/>
    <PageList :showList="showList" :menuname="menuName" />
    <div class="footer_btn" @click="goGetCoupon">兑换优惠码</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './menu'
import PageList from './PageList'

export default {
  name: 'coupon',
  components: {
    Menu,
    PageList
  },
  data: function () {
    return {
      menuName: 'not',
      coupon: {
        notList: [],
        alreadyList: [],
        expiredList: []
      }
    }
  },
  computed: {
    showList () {
      return this.coupon[this.menuName + 'List']
    },
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  created () {
    this.queryCouponData()
  },
  methods: {
    menuChange (menu) {
      this.menuName = menu
    },
    goGetCoupon () {
      this.$router.replace({name: 'GetCoupon'})
    },
    queryCouponData () {
      this.$store.commit('setCouponParams', {
        paramsKey: 'couponDataParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryCouponData')
        .then((data) => {
          if (this.$route.query.fromPage === 'service' && this.$route.query.goodsId) {
            let arr = this.$route.query.goodsId.split('_')
            console.log(arr)
            let list = data.notList || ''
            let res = []
            for (let i of arr) {
              for (let l of list) {
                if (l.couponGoodId.toString() === i.toString() && l.couponOrgId === this.getHomeData.orgId) {
                  res.push(l)
                }
              }
            }
            console.log(res)
            if (res.length > 0) {
              data.notList = res
            }
          }
          this.coupon = data
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer_btn{
  height: 42px;
  line-height: 42px;
  vertical-align: middle;
  color: #fff;
  font-size: 18px;
  background: #5ac4f3;
  text-align: center;
  margin:45px 20px 0 20px;
  border-radius: 4px;
}
</style>
