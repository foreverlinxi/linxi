<template>
  <div>
    <pageHead  @changemenu="tabMenu" />
    <PageList v-bind:menu="menu" />
  </div>
</template>

<script>

import pageHead from './pageHead'
import PageList from './list'

export default {
  name: 'detailList',
  components: {
    PageList,
    pageHead
  },
  data: function () {
    return {
      menu: 'consume'
    }
  },
  methods: {
    tabMenu (text) {
      this.menu = text
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
