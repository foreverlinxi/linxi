<template>
<div>
  <div v-for="(item, index) in packagelist" :key="index">
    <div v-if="index % 2 === 0" class="list">
      <div class="list_card  bgcolor" :class="{list_card_selected: index === 0}" @click="selectedPack($event, index)">
        <div class="list_row1">
          <span><label class="list_cir">￥</label>{{item.dinnerMoney}}</span>
        </div>
        <div v-for="(obj, i) in item.list" :key="i" :test1="obj">
          <div class="list_row">
            <span><label>{{obj.goodsName}}:</label>{{obj.goodsNum}}次</span>
          </div>
        </div>
        <img class="selected_img" src="../../assets/images/personal/checked.png" >
      </div>
      <div class="list_margin"></div>
      <div class="list_card" @click="selectedPack($event, index + 1)" :class="{bgcolor: index + 1 < packagelist.length, noselected: index + 1 >= packagelist.length}">
        <div v-if="index + 1 < packagelist.length" >
          <div class="list_row1">
            <span><label class="list_cir">￥</label>{{packagelist[index + 1].dinnerMoney}}</span>
          </div>
          <div v-for="(obj2, k) in packagelist[index + 1].list" :key="k">
            <div class="list_row">
              <span><label>{{obj2.goodsName}}:</label>{{obj2.goodsNum}}次</span>
            </div>
          </div>
          <img class="selected_img" src="../../assets/images/personal/checked.png" >
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['packagelist'],
  methods: {
    selectedPack (e, index) {
      if (e.currentTarget === document.querySelector('.noselected')) {
        return false
      }
      document.querySelector('.list_card_selected').classList.remove('list_card_selected')
      e.currentTarget.classList.add('list_card_selected')
      this.$emit('changeSelect', index)
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
  height: 90px;
  padding-bottom:4px;
  border-radius: 4px;
  border:2px solid #fff;
}
.bgcolor{
  background: #5ac4f3;
}
.selected_img{
  display: none;
}
.list_card_selected{
  border:2px solid #ed6575;
  position: relative;
}
.list_card_selected .selected_img{
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
  margin-bottom: 2px;
}
.list_row1>span{
  display: inline-block;
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
  background:#ffcd37;
  border-top-right-radius: 4px;
  font-size: 16px;
  font-weight: bold;
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
.list_row{
  padding-left: 36px;
  color: #fff;
  font-size: 12px;
}
</style>
