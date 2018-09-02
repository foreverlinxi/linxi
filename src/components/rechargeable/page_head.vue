<template>
  <div class="head">
    <img src="../../assets/images/personal/balanceBackground.png">
    <div class="head_text">
      <div class="head_textName">回家养车充值卡</div>
      <div class="head_money">账户内余额(元)</div>
      <div class="head_money_num">{{balance}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['balance']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  height: 170px;
  padding: 20px 20px 0 20px;
  background: #011924;
  position: relative;
}
.head>img{
  height: 100%;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.head_text{
  position: absolute;
  left: 0;
  top: 20px;
  height: 100px;
  width: 100%;
  color: #ffffff;
}
.head_textName{
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  margin-left: 32px;
}
.head_money{
  font-size: 12px;
  text-align: center;
}
.head_money_num{
  font-size: 24px;
  text-align: center;
}
</style>
