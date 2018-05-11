<template>
  <div id="app">
    <http/>
    <router-view/>
  </div>
</template>

<script>
import http from './components/ui/http'

export default {
  name: 'App',
  components: {
    http
  }
}
</script>

<style>
*{
   vertical-align: baseline;
   font-weight: inherit;
   font-family: inherit;
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
