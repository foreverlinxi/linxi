<template>
  <div class="service-success" v-if='isDone'>
    <div class="service-success-content">
      <div class="logo">
        <img src="./../../assets/images/personal/personal-check.png" />
      </div>
      <div>
        <div class="success-tip">您已成功提交订单！</div>
        <div class="key">(存钥匙码：{{hostStorePwd}})</div>
      </div>
    </div>
    <div class="detail-button">
      <div class="left"></div>
      <div class="detail-button-content" @click="goPage('OrderIndex')">
        订单详情
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ServiceSuccess',
  hostStorePwd: '',
  isDone: false,
  data () {
    return {
      //
    }
  },
  created () {
    console.log(this.$route.query)
    this.hostStorePwd = this.$route.query.hostStorePwd ? this.$route.query.hostStorePwd : ''
    this.isDone = true
  },
  methods: {
    goPage (pageName) {
      this.$router.push({
        name: pageName,
        query: {
          orderNo: this.$route.query.orderNo
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.service-success {
  height: 100%;
}
.service-success-content {
  height: 266px;
  text-align: center;
}
.logo {
  width: 100%;
}
.logo>img {
  width: 75px;
  height: 75px;
  margin-top: 65px;
  margin-bottom: 42px;
}
.success-tip {
  font-size: 14px;
}
.key {
  margin-top: 8px;
  font-size: 17px;
  color: #5ac4f3;
}
.detail-button {
  display: flex;
  height: 45px;
}
.left, .right {
  width: 10px;
}
.detail-button-content {
  flex: 1;
  background: #70b9fc;
  border-radius: 5px;
  text-align: center;
  line-height: 45px;
  color: #fff;
}
</style>
