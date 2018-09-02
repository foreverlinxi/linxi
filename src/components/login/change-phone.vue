<template>
  <div>
    <div class="title"><span v-text="title"></span></div>
    <!-- 更改手机号部分 -->
    <div class="login-list">
      <div class="login-list-left"></div>
      <div class="login-list-middle">
        <LoginPhoneCode :setPhoneValue="setPhoneValue" :setCodeValue="setCodeValue" :bottomLine="'N'" :showLogo="'N'" :status="status"/>
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

export default {
  name: 'ChangePhone',
  data () {
    return {
      title: '第一步，验证旧的手机号',
      phone: '',
      code: '',
      confirmText: '验证',
      status: '0' // 状态码，0表示输入旧的手机号，1表示输入新的手机号
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
      if (this.status === '0') {
        this.changeData()
      } else if (this.status === '1') {
        this.updatePhone()
      }
    },
    // 切换数据
    changeData () {
      this.status = '1'
      this.title = '第二步，绑定新的手机号码'
      this.confirmText = '确定'
    },
    // 修改手机号
    updatePhone () {
      this.$store.commit('setRegisterHomeParams', {
        paramsKey: 'updatePhoneParams',
        phone: this.phone,
        SMS: this.code
      })
      this.$store.dispatch('updatePhone')
        .then((data) => {
          let result = data.result
          if (result === '1') {
            this.$router.go(-1)
          } else if (result === '0') {
            this.$tip.show({
              message: '验证失败'
            })
          } else if (result === '2') {
            this.$tip.show({
              message: '短信验证码错误'
            })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 11px;
  color: #8d8d8d;
}
.title>span {
  margin-left: 20px;
}
.login-list {
  width: 100%;
  background: #fff;
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
