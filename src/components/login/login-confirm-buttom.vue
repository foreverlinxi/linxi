<template>
  <div>
    <div class="confirm">
      <div class="confirm-left"></div>
      <div class="confirm-middle" @click="confirm">{{confirmText}}</div>
      <div class="confirm-right"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'loginConfirmButtom',
  data () {
    return {
    }
  },
  props: ['confirmCallback', 'confirmText'],
  methods: {
    confirm () {
      this.confirmCallback && this.confirmCallback()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.confirm-left, .confirm-right {
  width: 20px;
}
.confirm-middle {
  flex: 1;
}
.confirm {
  margin-top: 50px;
  display: flex;
}
.confirm-middle {
  background: linear-gradient(to right, #5ac4f3, #77b4ff);
  height: 42.5px;
  border-radius: 3px;
  color: #fff;
  text-align: center;
  line-height: 42.5px;
}
</style>
