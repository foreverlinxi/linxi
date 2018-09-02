<template>
  <div class="home-footer">
    <div class="item-list">
      <div class="item" @click="jumpPage('home')">
        <img src="./../../assets/images/home/home-selected.png" v-if="fromPage === 'home'"/>
        <img src="./../../assets/images/home/home-logo.png" v-else />
        <div :class="fromPage === 'home' ? 'active' : ''">首页</div>
      </div>
      <div class="item" @click="jumpPage('quality')">
        <img src="./../../assets/images/home/quality-selected.png" v-if="fromPage === 'quality'"/>
        <img src="./../../assets/images/home/quality-logo.png" v-else />
        <div :class="fromPage === 'quality' ? 'active' : ''">质检</div>
      </div>
      <div class="item" @click="jumpPage('account')">
        <img src="./../../assets/images/home/account-selected.png" v-if="fromPage === 'account'"/>
        <img src="./../../assets/images/home/account-logo.png" v-else />
        <div :class="fromPage === 'account' ? 'active' : ''">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter',
  data () {
    return {
      //
    }
  },
  props: ['fromPage'],
  methods: {
    jumpPage (pageName) {
      if (pageName === 'quality') {
        this.toGoPage('Check')
      } else if (pageName === 'home') {
        this.toGoPage('Home')
      } else if (pageName === 'account') {
        this.toGoPage('Center')
      }
    },
    toGoPage (pageName) {
      this.$router.push({
        name: pageName
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-footer {
  height: 45px;
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dcdcdc;
  background-color: #fff;
}
.item-list {
  display: flex;
}
.item {
  flex: 1;
  text-align: center;
  font-size: 11px;
  margin-top: 5px;
}
.item>img{
  height: 19px;
  width: 18px;
}
.active {
  color: #5ac4f3;
}
</style>
