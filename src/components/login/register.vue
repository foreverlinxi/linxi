<template>
  <div>
    <!-- 注册部分 -->
    <div class="login-list">
      <div class="login-list-left"></div>
      <div class="login-list-middle">
        <LoginPhoneCode :setPhoneValue="setPhoneValue" :setCodeValue="setCodeValue"/>
        <div class="login-list-item">
          <img src="./../../assets/images/login/account.png" />
          <input type="text" placeholder="请输入姓名(汉字)" v-model="name"/>
        </div>
        <div class="login-list-item">
          <img src="./../../assets/images/login/sex.png" />
          <div class="sex boy" :class="{active: sex === '1'}" @click="selectSex('1')">男</div>
          <div class="sex girl" :class="{active: sex === '2'}" @click="selectSex('2')">女</div>
        </div>
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
      name: '',
      sex: '1',
      count: 60,
      confirmText: '确定'
    }
  },
  components: {
    LoginPhoneCode,
    LoginConfirmButtom
  },
  methods: {
    selectSex (sex) {
      this.sex = sex
    },
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
      } else if (this.name === '') {
        this.$tip.show({
          message: '请输入姓名'
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
      this.registerHome()
    },
    // 注册调用的方法
    registerHome () {
      this.$store.commit('setRegisterHomeParams', {
        paramsKey: 'registerHomeParams',
        phone: this.phone,
        name: this.name,
        sex: this.sex,
        SMS: this.code,
        openid: Lockr.get('openid')
      })
      this.$store.dispatch('registerHome')
        .then((data) => {
          let result = data.result
          if (result === '1') {
            this.$router.push({
              name: 'Home'
            })
          } else if (result === '0') {
            this.$tip.show({
              message: '注册失败'
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
.login-list {
  width: 100%;
  height: 203px;
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
  margin-left: 20px;
  vertical-align: middle;
  font-size: 14px;
  width: 120px;
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
.sex {
  width: 40px;
  height: 25px;
  background: #f0f0f0;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  line-height: 25px;
  text-align: center;
  color: #000000;
  font-size: 14px;
}
.active {
  color: #fff;
  background: #5ac4f3;
}
.boy {
  margin-left: 20px;
}
.girl {
  margin-left: 15px;
}
</style>
