<template>
  <div v-show="show">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
        <p class="weui_toast_content">{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  data () {
    return {
      show: false,
      message: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui_mask_transparent {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.weui_toast {
  position: fixed;
  z-index: 3;
  width: 10em;
  /* min-height: 7.6em; */
  top: 45%;
  left: 45%;
  margin-left: -3.8em;
  background: rgba(40, 40, 40, 0.75);
  text-align: center;
  border-radius: 5px;
  color: #FFFFFF;
}
.weui_toast_content {
  margin: 0 0 15px;
  margin-top: 10%;
  font-size: 14px;
}
</style>
