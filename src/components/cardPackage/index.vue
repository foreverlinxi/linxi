<template>
  <div >
    <div class="page_padding">
      <PageHead v-bind:packagelist="list" />
      <PageList v-bind:packagelist="list" />
    </div>
    <div class="footer_btn" @click="goPackPage" >购买套餐</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHead from './pageHead'
import PageList from './pageList'

export default {
  name: 'cardPack',
  components: {
    PageHead,
    PageList
  },
  data: function () {
    return {
      list: []
    }
  },
  created () {
    this.queryUserDinner()
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    goPackPage () {
      this.$router.push({
        name: 'CardPackRech'
      })
    },
    queryUserDinner () {
      this.$store.commit('setUserDinnerParams', {
        paramsKey: 'userDinnerParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryUserDinnerData')
        .then((data) => {
          this.list = data.dinnerList
          console.log(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  background: #f0f0f0;
}
.page_padding{
  padding: 0 10px 1px 10px;
  background: #fff;
}
.footer_btn{
  margin:60px 20px 0 20px;
  height: 43px;
  line-height: 43px;
  vertical-align: middle;
  text-align: center;
  color: #f0f0f0;
  font-size: 19px;
  background: #5ac4f3;
  border-radius: 4px;
}
</style>
