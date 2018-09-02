<template>
  <div>
    <img class="head_img" src="../../assets/images/personal/backgroundImg.jpg">
    <div class="div_position">
      <div class="main">
        <div class="main_marginHead"></div>
        <CenterHead  v-bind:userdata="userData" />
        <CenterList v-bind:user_msg="userData.unreadNum" />
        <div class="butttom_margin"></div>
      </div>
    </div>
    <HomeFooter :fromPage="'account'"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CenterHead from './center_head'
import CenterList from './center_list'
import HomeFooter from '../home/home-footer'

export default {
  name: 'userCenter',
  components: {
    CenterHead,
    CenterList,
    HomeFooter
  },
  data: function () {
    return {
      userData: ''
    }
  },
  created () {
    this.queryUserData()
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    queryUserData () {
      this.$store.commit('setUserParams', {
        paramsKey: 'userDataParams',
        userId: this.getHomeData.userId,
        orgId: this.getHomeData.orgId
      })
      this.$store.dispatch('queryUserData')
        .then((data) => {
          this.userData = data
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head_img{
  width: 100%;
  height: 150px;
}
.div_position{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.main{
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
.main_marginHead{
  height: 105px;
}
.butttom_margin{
  height: 60px;
}
</style>
