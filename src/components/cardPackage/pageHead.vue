<template>
  <div class="card_pack">
    <div class="card_img">
      <img src="../../assets/images/personal/personal-order.png">
    </div>
    <div class="card_pack_text">套餐卡(<label>{{packagelist.length}}</label>)</div>
  </div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['packagelist'],
  data () {
    return {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card_pack{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  color: #05567a;
  font-size: 19px;
  display: -webkit-flex;
  display: flex;
}
.card_img{
  width: 22px;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
}
.card_img>img{
  width: 22px;
  height: 15px;
}
.card_pack_text{
  flex: 1;
  margin-left: 15px;
}
</style>
