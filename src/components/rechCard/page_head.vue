<template>
  <div class="head">
    <img src="../../assets/images/personal/car-wash.png">
    <div class="head_text">
      <div class="head_add">{{orgname}}</div>
      <div class="head_card">充值卡</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['orgname']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  height: 180px;
  position: relative;
  border-radius: 10px;
}
.head>img{
  height: 100%;
  width: 100%;
}
.head_text{
  position: absolute;
  left: 0;
  top: 15px;
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
  width: 100%;
  display: -webkit-flex;
  display: flex;
}
.head_add{
  margin-left: 15px;
  flex: 1;
  color: #c8f3ff;
  font-size: 14px;
}
.head_card{
  width: 6rem;
  color: #ffffff;
  font-size: 19px;
}
</style>
