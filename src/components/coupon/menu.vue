<template>
  <div class="head">
    <div class="menu " @click="changeClass ('not')" :class="{menu_selected: getClass.not}">
      未使用(<label>{{coupon.notList.length}}</label>)
    </div>
    <div class="menu menu_border" @click="changeClass ('already')" :class="{menu_selected: getClass.already}">
      已使用(<label>{{coupon.alreadyList.length}}</label>)
    </div>
    <div class="menu" @click="changeClass ('expired')" :class="{menu_selected: getClass.expired}">
      已过期(<label>{{coupon.expiredList.length}}</label>)
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_head',
  props: ['coupon', 'menuname'],
  data: function () {
    return {
      menu: 'noMenu'
    }
  },
  computed: {
    getClass: function () {
      let obj = {
        not: false,
        already: false,
        expired: false
      }
      obj[this.menu] = true
      if (this.menu === 'noMenu') {
        obj[this.menuname] = true
      }
      return obj
    }
  },
  methods: {
    changeClass (status) {
      this.menu = status
      this.$emit('changMenu', status)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  background: #fff;
  color: #8d8d8d;
  display: -webkit-flex;
  display: flex;
  font-size: 16px;
}
.menu{
  flex: 1;
  height: 35px;
  line-height: 35px;
  vertical-align: middle;
  text-align: center;
}
.menu_selected{
  color: #fff;
  background: #5ac4f3;
  border: 0;
}
.menu_border{
  border-right: 1px solid #8d8d8d;
  border-left: 1px solid #8d8d8d;
}
</style>
