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
  name: 'HomeFooter',
  data () {
    return {
      //
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
  height: 18px;
  width: 18px;
}
</style>
