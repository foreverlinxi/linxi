<template>
<div>
  <div v-for="(item, index) in balancelist" :key="index">
    <div v-if="index % 2 === 0" class="list">
      <div class="list_card  list_color" @click="selectCard(index)" :class="index === cardNum ? 'list_selected' : '' ">
        <div class="list_row1">
          <span><label class="list_cir">赠</label>{{item.sendPrice}}元</span>
        </div>
        <div class="list_row2">
          ￥<span>{{item.price}}</span>
        </div>
        <div class="list_row3">
          充值{{item.price}}赠{{item.sendPrice}}
        </div>
        <img class="selected_img" src="../../assets/images/personal/checked.png" />
      </div>
      <div class="list_margin"></div>
      <div v-if="index % 2 === 0 && (index + 1) < balancelist.length" class="list_card list_color"  @click="selectCard(index+1)" :class="index + 1 === cardNum ? 'list_selected' : '' ">
        <div class="list_row1">
          <span><label class="list_cir">赠</label>{{balancelist[index + 1].sendPrice}}元</span>
        </div>
        <div class="list_row2">
          ￥<span>{{balancelist[index + 1].price}}</span>
        </div>
        <div class="list_row3">
          充值{{balancelist[index + 1].price}}赠{{balancelist[index + 1].sendPrice}}
        </div>
        <img class="selected_img" src="../../assets/images/personal/checked.png" >
      </div>
      <div v-else-if="index % 2 === 0" class="list_card">
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'card_list',
  props: ['balancelist'],
  data: function () {
    return {
      cardNum: 0
    }
  },
  methods: {
    selectCard: function (num) {
      this.cardNum = num
      this.$emit('selectedlist', num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
  margin-top: 20px;
  display: -webkit-flex;
  display: flex;
}
.list_card{
  flex: 1;
  height: 80px;
  border-radius: 4px;
  border:2px solid #fff;
}
.list_color{
  background: #5ac4f3;
}
.list_card_space{
  flex: 1;
  height: 0;
  overflow: hidden;
}
.selected_img{
  display: none;
}
.list_selected{
  border:2px solid #ed6575;
  position: relative;
}
.list_selected .selected_img{
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-block;
  width: 20px;
  height: 20px;
}
.list_margin{
  width: 20px;
}
.list_row1{
  height: 25px;
  text-align: right;
  color: #3d3d3d;
}
.list_row1>span{
  display: inline-block;
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
  background:#ffcd37;
  border-top-right-radius: 4px;
  font-size: 16px;
  padding: 0 5px 0 15px;
  position: relative;
}
.list_cir{
  display: inline-block;
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
  width: 25px;
  background: #ffcd37;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  position: absolute;
  left: -10px;
  top: 0;
}
.list_row2{
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
  color: #ffffff;
  text-align: center;
}
.list_row2>span{
  font-size: 18px;
}
.list_row3{
  height: 15px;
  line-height: 15px;
  vertical-align: middle;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
}
</style>
