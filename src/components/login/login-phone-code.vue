<template>
  <div>
    <div class="login-list-item bottom-line">
      <img src="./../../assets/images/login/phone.png" v-if="showLogo !== 'N'"/>
      <span v-else>{{status === '0' ? '当前' : '新的'}}手机号:</span>
      <input type="number" :style="{'marginLeft': showLogo === 'N' ? '10px' : ''}" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入手机号码" v-model="phone" @blur="setPhoneValue(phone)"/>
    </div>
    <div class="login-list-item" :class="bottomLine === 'N' ? '' : 'bottom-line'">
      <img src="./../../assets/images/login/secure.png" v-if="showLogo !== 'N'"/>
      <span v-else>输入验证码:</span>
      <input type="number" :style="{'marginLeft': showLogo === 'N' ? '10px' : ''}" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入验证码" v-model="code"  @blur="validateCode"/>
      <div class="get-code" @click="getCode" v-if="!hasGetCode">获取验证码</div>
      <div class="get-code second" v-else>{{count}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'loginPhoneCode',
  data () {
    return {
      phone: '',
      code: '',
      count: 60,
      hasGetCode: false,
      msgCode: ''
    }
  },
  props: [
    'setPhoneValue',
    'setCodeValue',
    'bottomLine',
    'showLogo',
    'status'
  ],
  watch: {
    status (newVal) {
      this.setPhoneValue('')
      this.setCodeValue('')
      this.phone = ''
      this.code = ''
      this.count = 0
    }
  },
  methods: {
    // 获取验证码
    getCode (type) {
      if (this.phone === '') {
        this.$tip.show({
          message: '请先输入手机号'
        })
        return
      }
      this.sendMsg()
    },
    // 获取短信验证码
    sendMsg () {
      let self = this
      this.$store.commit('setRegisterHomeParams', {
        paramsKey: 'sendMsgParams',
        phone: this.phone
      })
      this.$store.dispatch('sendMsg')
        .then((data) => {
          this.msgCode = String(data.VerifCode) || ''
          this.hasGetCode = true
          let countFun = setInterval(() => {
            self.count--
            if (self.count <= 0) {
              clearInterval(countFun)
              self.hasGetCode = false
              self.count = 60
            }
          }, 1000)
        })
    },
    // 校验短信验证码是否错误...org!!!
    validateCode () {
      if (this.code !== this.msgCode) {
        this.$tip.show({
          message: '验证码错误，请重新输入'
        })
        this.code = ''
      } else {
        this.setCodeValue(this.code)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-list-item {
  height: 50px;
  line-height: 50px;
}
.login-list-item>img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.login-list-item input {
  margin-left: 20px;
  vertical-align: middle;
  font-size: 14px;
  width: 120px;
}
.margin-left-noLogo {
  margin-left: 12px;
}
.login-list-item span {
  font-size: 13px;
  color: #3d3d3d;
}
.bottom-line {
  border-bottom: 1px solid #f0f0f0;
}
input::-webkit-input-placeholder{
  color: #8d8d8d;
}
.get-code {
  height: 25px;
  width: 70px;
  background: #5ac4f3;
  float: right;
  margin-top: 12.5px;
  border-radius: 3px;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
.second {
  background: #e8bd42;
}
</style>
