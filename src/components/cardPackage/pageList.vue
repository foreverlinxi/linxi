<template>
<div>
  <div v-for="(cardobj, index) in packagelist " :key="index"  v-bind:class="'list backColor' + index % 3"  >
    <div class="list_flex">
      <div class="big_name">
        <span>{{cardobj.dinnerName}}</span>
      </div>
      <div class="list_flex_right">
        <div class="list_name">{{cardobj.goodsName}}</div>
        <div><label>{{cardobj.goodsNum}}</label>次</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['packagelist']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list{
    height: 90px;
    margin-bottom: 12px;
    border-radius: 4px;
  }
  .backColor0{
    background: #ed6575;
    color: #ed6575;
  }
  .backColor1{
    background: #5ac4f3;
    color: #5ac4f3;
  }
  .backColor2{
    background: #e1cb21;
    color: #e1cb21;
  }
  .list_flex{
    display: -webkit-flex;
    display: flex;
  }
  .big_name{
    margin-left: 15px;
    margin-right: 8px;
    width: 50px;
    height: 90px;
    line-height: 90px;
    vertical-align: middle;
  }
  .big_name>span{
    display: inline-block;
    background: #f0f0f0;
    border-radius: 50%;
    font-size: 19px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    text-align: center;
  }
  .list_flex_right{
    flex: 1;
    font-size: 16px;
    color: #f0f0f0;
    padding-top: 15px;
  }
  .list_name{
    font-size: 19px;
    height: 35px;
    line-height: 35px;
    vertical-align: middle;
  }
</style>
