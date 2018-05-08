<template>
  <div class="home-footer">
    <div class="item-list">
      <div class="item">
        <img src="./../../assets/images/home/home-logo.png"/>
        <div>首页</div>
      </div>
      <div class="item">
        <img src="./../../assets/images/home/quality-logo.png"/>
        <div>质检</div>
      </div>
      <div class="item">
        <img src="./../../assets/images/home/account-logo.png"/>
        <div>我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
  background-color: #fff;
}
.item-list {
  display: flex;
}
.item {
  flex: 1;
  text-align: center;
  font-size: 11px;
}
.item>img{
  height: 18px;
  width: 18px;
}
</style>
