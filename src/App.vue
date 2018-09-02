<template>
  <div id="app">
    <http/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
// loading组件，配合http请求使用
import http from './components/ui/loading/http'

export default {
  name: 'App',
  components: {
    http
  }
}
</script>

<style>
/* @font-face {
  font-family: Helvetica;
  src: url("../static/fonts/helveticaneueltpro.ttf");
}
@font-face {
  font-family: PingFangSC-Regular;
  src: url("../static/fonts/PingFangSC-Regular.ttf");
} */
*{
   vertical-align: baseline;
   font-weight: inherit;
   /* font-family: Helvetica, PingFangSC-Regular; */
   font-family: '微软雅黑';
   font-style: inherit;
   font-size: 100%;
   outline: 0;
   padding: 0;
   margin: 0;
   border: 0;
}
body {
  background-color: #f4f4f4;
  height: 100%;
}
</style>
