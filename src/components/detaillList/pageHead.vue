<template>
  <div class="head">
    <div @click="clickMune('consume')" :class="{selectedMenu: getMenu === 'consume'}">消费明细</div>
    <div @click="clickMune('buy')" :class="{selectedMenu: getMenu === 'buy'}">购买明细</div>
  </div>
</template>

<script>
export default {
  name: 'page_head',
  data: function () {
    return {
      menu: 'consume'
    }
  },
  computed: {
    getMenu () {
      return this.menu
    }
  },
  methods: {
    clickMune (text) {
      this.menu = text
      this.$emit('changemenu', text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  color: #3d3d3d;
  font-size: 14px;
  background: #f0f0f0;
  display: -webkit-flex;
  display: flex;
}
.head>div{
  flex:1;
  height: 35px;
  line-height:35px;
  vertical-align: middle;
  text-align: center;
}
.selectedMenu{
  color: #fff;
  background: #5ac4f3;
}
</style>
