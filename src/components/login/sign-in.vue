<template>
  <div>
    <!-- 登录部分 -->
    <div class="login-list">
      <div class="login-list-left"></div>
      <div class="login-list-middle">
        <LoginPhoneCode :setPhoneValue="setPhoneValue" :setCodeValue="setCodeValue" :bottomLine="'N'"/>
      </div>
      <div class="login-list-right"></div>
    </div>
    <!-- 确定按钮 -->
    <LoginConfirmButtom :confirmCallback="confirm" :confirmText="confirmText"/>
  </div>
</template>

<script>
import LoginPhoneCode from './login-phone-code'
import LoginConfirmButtom from './login-confirm-buttom'
import Lockr from 'lockr'

export default {
  name: 'Register',
  data () {
    return {
      phone: '',
      code: '',
      confirmText: '登录'
    }
  },
  components: {
    LoginPhoneCode,
    LoginConfirmButtom
  },
  methods: {
    // 校验需要输入的值
    validate () {
      if (this.phone === '') {
        this.$tip.show({
          message: '请输入手机号'
        })
        return false
      } else if (this.code === '') {
        this.$tip.show({
          message: '请输入手机验证码'
        })
        return false
      }
      return true
    },
    setPhoneValue (phone) {
      this.phone = phone
    },
    setCodeValue (code) {
      this.code = code
    },
    // 确认按钮
    confirm () {
      if (!this.validate()) return
      this.loginUser()
    },
    // 注册调用的方法
    loginUser () {
      this.$store.commit('setRegisterHomeParams', {
        paramsKey: 'loginUserParams',
        phone: this.phone,
        openid: Lockr.get('openid')
      })
      this.$store.dispatch('loginUser')
        .then((data) => {
          let result = data.result
          if (result === '1') {
            this.$router.push({
              name: 'Home'
            })
          } else if (result === '0') {
            this.$tip.show({
              message: '未注册'
            })
            this.$router.push({
              name: 'Register'
            })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-list {
  width: 100%;
  background: #fff;
  margin-top: 10px;
  display: flex;
}
.login-list-left, .login-list-right{
  width: 20px;
}
.login-list-middle{
  flex: 1;
}
.login-list-item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f0f0f0;
}
.login-list-item>img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.login-list-item input {
  margin-left: 35px;
  vertical-align: middle;
  font-size: 14px;
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
