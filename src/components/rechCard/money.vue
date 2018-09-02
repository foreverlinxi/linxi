<template>
  <div class="money">
    <div>卡内余额(元)</div>
    <div class="money_num">{{mybalance}}</div>
  </div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['mybalance']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money{
  margin-bottom: 40px;
  display: -webkit-flex;
  display: flex;
}
.money>div{
  flex:1;
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
}
.money>.money_num{
  font-size: 20px;
  color: #5ac4f3;
  font-weight: bold;
}
</style>
