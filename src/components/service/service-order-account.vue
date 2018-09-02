<template>
  <div class="service-order-account">
    <div class="left"></div>
    <div class="content">
      <!-- 余额 -->
      <div class="item">
        <div class="item-logo">
          <img src="./../../assets/images/service/beauty-money.png" />
        </div>
        <div class="item-content">
          <div class="item-content-title">充值卡</div>
          <div class="item-content-detail">余额 ¥ <span>{{balance}}，</span><span>{{balanceText}}</span></div>
        </div>
        <div class="item-content-button">
          <input class="botton" :class="buttonBalance ? 'checked' : ''" type="checkbox" @click="selectBalance">
        </div>
      </div>
      <div class="line"></div>
      <!-- 套餐卡 -->
      <div class="item-dinner">
        <div class="item-logo-dinner">
          <img src="./../../assets/images/service/beauty-file.png" />
        </div>
        <div class="item-content">
          <div class="item-content-title">套餐卷</div>
          <div v-if="!hasDinnerGoods || hasCutDinnerList.length <= 0">
            <div class="item-content-detail">
              无可用套餐卷
            </div>
          </div>
          <div v-else>
            <div class="item-content-detail" v-for="(item, index) in hasCutDinnerList" :key="index">
              {{item.goodsName}}卡
              <div class="dinner-tip" v-if="buttonCombo">已抵扣1次</div>
              <div class="dinner-tip" v-else>暂不使用</div>
            </div>
          </div>
        </div>
        <div class="item-content-more" @click="goPage('CardPack')">
          <img class="item-content-more" src="./../../assets/images/personal/personal-right.png" />
        </div>
        <div class="item-content-button">
          <input class="botton" :class="buttonCombo ? 'checked' : ''" type="checkbox" @click="selectCombo">
        </div>
      </div>
      <div class="line"></div>
      <!-- 优惠券 -->
      <div class="item">
        <div class="item-logo">
          <img src="./../../assets/images/service/beauty-tag.png" />
        </div>
        <div class="item-content">
          <div class="item-content-title">优惠券</div>
          <div class="item-content-detail">{{couponText}}</div>
        </div>
        <div class="item-content-more" @click="goCouponPage()">
          <img class="item-content-more" src="./../../assets/images/personal/personal-right.png" />
        </div>
        <div class="item-content-button">
          <input class="botton" :class="buttonDiscount ? 'checked' : ''" type="checkbox" @click="selectDiscount">
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 操作localstorage的库
import Lockr from 'lockr'

export default {
  name: 'ServiceOrderAccount',
  data () {
    return {
      // 余额按钮，用于控制按钮开关展示
      buttonBalance: false,
      // 余额不可点击判断，当最终结算
      buttonBalanceSwitch: true,
      // 余额栏文字提示
      // balanceText: '',
      // 套餐按钮
      buttonCombo: false,
      // 优惠券按钮
      buttonDiscount: false,
      // 优惠券不可点击开关
      buttonDiscountSwitch: false
    }
  },
  props: [
    'hasCutDinnerList',
    'setDinnerCutButton',
    'setBalanceCutButton',
    'afterDinnerCutPrice',
    'afterBalanceCutPrice',
    'goodsIdList',
    'couponButton',
    'setCouponButton',
    'allPrice'
  ],
  watch: {
    hasCutDinnerList (newVal) {
      if (newVal.length > 0) {
        this.buttonCombo = true
      } else {
        this.buttonCombo = false
      }
    },
    afterDinnerCutPrice (newVal) {
      if (newVal <= 0) {
        this.buttonBalanceSwitch = false
      } else {
        this.buttonBalanceSwitch = true
      }
    },
    afterBalanceCutPrice (newVal) {
      if (newVal <= 0) {
        this.buttonDiscountSwitch = false
      } else {
        this.buttonDiscountSwitch = true
      }
    },
    couponButton (newVal) {
      if (newVal === 'N') {
        this.buttonDiscount = false
      }
    },
    balanceText (newVal) {
      if (newVal === '无法余额支付') {
        this.setBalanceCutButton('N')
        this.buttonBalanceSwitch = false
      }
    }
  },
  computed: {
    ...mapGetters({
      getWashBeauty: 'getWashBeauty',
      getHomeData: 'getHomeData'
    }),
    balance () {
      return (this.getWashBeauty.balance).toFixed(2)
    },
    balanceText () {
      return Number(this.balance) <= 0 || !this.buttonBalanceSwitch || (this.allPrice <= 0 && this.buttonCombo) ? '无法余额支付' : '可用余额支付'
    },
    // 是否有套餐卡
    hasDinnerGoods () {
      return this.getWashBeauty.haveDinnerGoods && this.getWashBeauty.haveDinnerGoods.length > 0
    },
    // 是否有优惠券
    hasCoupon () {
      return this.getWashBeauty.haveCoupon && this.getWashBeauty.haveCoupon.length > 0
    },
    // 可以使用优惠券前提下，看有无适合的优惠券可以使用
    hasCanUseCoupon () {
      if (this.allPrice && this.hasCoupon) {
        for (let i = 0; i < this.goodsIdList.length; i++) {
          for (let y = 0; y < this.getWashBeauty.haveCoupon.length; y++) {
            // 需要服务id和小区id都对的上
            if (this.goodsIdList[i] === this.getWashBeauty.haveCoupon[y].couponGoodId) {
              return true
            }
          }
        }
        return false
      }
      return false
    },
    // 页面优惠券提示信息
    couponText () {
      let activeCoupon = Lockr.get('activeCoupon')
      if (activeCoupon && this.buttonDiscount) {
        return `已抵扣${activeCoupon.couponMoney}元`
      } else if (activeCoupon) {
        return `开启按钮可抵扣${activeCoupon.couponMoney}元`
      }
      return this.hasCanUseCoupon ? '有可用的优惠券' : '无可用优惠券'
    },
    // 判断优惠券按钮开关是否可以用，也阻止跳优惠券页面
    canUseCoupon () {
      // 没有优惠券，按钮不给开启
      if (!this.hasCoupon) return false
      // 结算金额小于或等于0，优惠券不给开启
      if (!this.buttonDiscountSwitch) return false
      // 可以使用优惠券，但是没有可用的优惠券，不给开启
      if (!this.hasCanUseCoupon) return false
      return true
    }
  },
  activated () {
    this.selectDiscount()
  },
  methods: {
    // 使用余额支付按钮
    selectBalance () {
      // 余额小于等于0，按钮不给开启
      if (Number(this.balance) <= 0) return
      // 当前项目总金额-套餐卡抵扣，如果等于0，那么余额支付不开启
      if (!this.buttonBalanceSwitch) return
      // 总付款小于等于0,不给余额支付
      // if (this.allPrice <= 0) return
      this.buttonBalance = !this.buttonBalance
      if (this.buttonBalance) {
        this.setBalanceCutButton('Y')
      } else {
        this.setBalanceCutButton('N')
      }
    },
    // 使用套餐卡支付按钮
    selectCombo () {
      // 没有套餐，按钮不给开启
      if (!this.hasDinnerGoods || this.hasCutDinnerList.length <= 0) return
      this.buttonCombo = !this.buttonCombo
      if (this.buttonCombo) {
        this.setDinnerCutButton('Y')
      } else {
        this.setDinnerCutButton('N')
      }
    },
    // 使用优惠券支付按钮
    selectDiscount () {
      // 不符合优惠卷使用规则，return
      if (!this.canUseCoupon) return
      // 本地没有存优惠券信息，不可以开启。优惠券页面选择以后，会存在本地。
      let activeCoupon = Lockr.get('activeCoupon')
      if (!activeCoupon) return
      this.buttonDiscount = !this.buttonDiscount
      let button = this.buttonDiscount ? 'Y' : 'N'
      let couponCut = this.buttonDiscount ? activeCoupon.couponMoney : 0
      this.setCouponButton(button, couponCut)
    },
    goPage (pageName) {
      this.$router.push({
        name: pageName
      })
    },
    // 去优惠券页面
    goCouponPage () {
      // 不符合优惠卷使用规则，return
      if (!this.canUseCoupon) return
      this.$router.push({
        name: 'Coupon',
        query: {
          fromPage: 'service',
          goodsId: this.goodsIdList.join('_')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.service-order-account {
  display: flex;
  /* height: 155px; */
  background: #fff;
}
.left, .right {
  width: 25px;
  height: 100%;
}
.content {
  flex: 1;
}
.item {
  height: 50px;
  line-height: 50px;
}
.item-dinner {

}
.line {
  height: 2px;
  background: #f0f0f0;
}
.item-logo {
  height: 50px;
  display: inline-block;
  width: 15px;
  margin-right: 8px;
}
.item-logo-dinner {
  display: inline-block;
  width: 15px;
  margin-right: 8px;
  vertical-align: top;
  margin-top: 20px;
}
img {
  height: 15px;
  width: 15px;
  padding-bottom: 5.5px;
}
.item-content {
  display: inline-block;
}
.item-content-title {
  font-size: 10px;
  color: #656565;
  height: 20px;
  line-height: 34px;
}
.item-content-detail {
  font-size: 13px;
  height: 30px;
  line-height: 26px;
}
.item-content-more {
  display: inline-block;
  vertical-align: middle;
  float: right;
  margin-top: 11px;
  margin-left: 10px;
}
.item-content-more>img {
  width: 6.5px;
  height: 12.5px;
}
.item-content-button {
  display: inline-block;
  width: 50xp;
  line-height: 0px;
  float: right;
  margin-top: 15px;
  z-index: 1;
}
.dinner-tip {
  display: inline-block;
  background: #5ac4f3;
  height: 17px;
  width: 75px;
  border-radius: 17px;
  line-height: 17px;
  text-align: center;
  color: #fff;
  font-size: 11px;
  margin-left: 5px;
}
/* 滑动按钮样式 */
.botton{
    margin:0;
    padding:0;
    border:none;
    width: 50px;
    height: 25px;
    position:relative;
    color:#fff;
    background:none;
    -webkit-appearance: none;
    appearance: none;
    overflow: hidden;
    border-radius: 50px;
    vertical-align: top;
}
.botton:before,
.botton:after{
    position: absolute;
    left:0;
    top:0;
    content:'';
}
.botton:before{
    /* transition: all 0.5s; */
    position:absolute;
    top:0;right:0;bottom:0;left:0;
    border-radius: 50px;
    background:#f0f0f0;
    border:.03rem solid #E5E5E5;
}
.botton:after{
    /* transition: all 0.5s; */
    border-radius: 50px;
    top:4px;
    left:4px;
    width: 16.5px;
    height: 16.5px;
    background:#fff;
    box-shadow:0px .04rem .08rem rgba(0,0,0,0.3),0px 0px .02rem rgba(0,0,0,0.3);
}
.botton.checked:before{
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-style:solid;
    border-color:#5ac4f3;
    border-width: 0px 0px 0px 50px;
}
.botton.checked:after{
    -webkit-animation: botton_after_checked 0.3s;-webkit-animation-fill-mode:both;
    -moz-animation: botton_after_checked 0.3s;-moz-animation-fill-mode:both;
}

@-webkit-keyframes botton_after_checked {
    0% {left:0px;}
    100% {left:30px;}
}

.botton:disabled{
    opacity:0.6;
}
.botton:disabled:checked:before{
    border-color:#ddd;
}
/* end */

</style>
