<template>
  <div v-show="show">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">温馨提示</strong></div>
        <div class="weui-dialog__bd">{{message}}</div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="cancel">{{cancelText}}</a>
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="confirm">{{confirmText}}</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  data () {
    return {
      show: false,
      message: '请传入提示内容',
      cancelText: '取消',
      confirmText: '确定',
      confirmCallback: () => {},
      cancelCallback: () => {}
    }
  },
  methods: {
    cancel () {
      this.show = false
      this.cancelCallback()
    },
    confirm () {
      this.show = false
      this.confirmCallback()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.weui-dialog {
  position: fixed;
  z-index: 5000;
  width: 80%;
  max-width: 300px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
}
.weui-dialog__hd {
  padding: 1.3em 1.6em 0.5em;
}
.weui-dialog__title {
  font-weight: 400;
  font-size: 18px;
}
.weui-dialog__bd {
  padding: 0 1.6em 0.8em;
  /* min-height: 40px; */
  font-size: 15px;
  line-height: 1.3;
  word-wrap: break-word;
  word-break: break-all;
  color: #808080;
}
.weui-dialog__ft {
  position: relative;
  line-height: 48px;
  font-size: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.weui-dialog__ft:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D5D5D6;
  color: #D5D5D6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-dialog__btn {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #09BB07;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.weui-dialog__btn:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #D5D5D6;
  color: #5ac4f3;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.weui-dialog__btn_default {
  color: #353535;
}
.weui-dialog__btn_primary {
  color: #5ac4f3;
}
</style>
