<template>
  <div class="home-account">
    <div class="left"></div>
    <div class="content">
      <!-- 充值卡 -->
      <div class="recharge">
        <div>
          <img src="./../../assets/images/home/recharge.png"/><span class="title">充值卡(元)</span>
        </div>
        <div class="money">
          <span>{{balance}}</span><span class="decimals">.00</span>
        </div>
      </div>
      <!-- 分割线 -->
      <img src="./../../assets/images/home/cut-line.png" style="height: 72px;weight: 3px;margin-top: 25px;"/>
      <!-- 优惠券 -->
      <div class="combo">
        <div>
          <img class="package" src="./../../assets/images/home/package.png"/><span class="title">套餐卡(次)</span>
        </div>
        <div class="item">
          <div class="item-content-left"></div>
          <div class="item-content">
            <div class="average">
              <div class="num" v-text="hasDinnerList ? dinnerList[0].goodsNum : '-'"></div>
              <div v-if="hasDinnerList">{{dinnerList[0].goodsName}}</div>
            </div>
            <div class="perfect">
              <div class="num" v-text="hasDinnerList ? dinnerList[1].goodsNum : '-'"></div>
              <div v-if="hasDinnerList">{{dinnerList[1].goodsName}}</div>
            </div>
            <!-- 套餐卡存在的时候显示更多 -->
            <div class="more" @click="goPage('CardPack')" v-if="hasDinnerList">
              <div class="num"><img class="more" src="./../../assets/images/home/more.png"/></div>
              <div>更多</div>
            </div>
            <!-- 不存在的时候显示下面的横杠 -->
            <div class="perfect" v-else>
              <div class="num">-</div>
              <div></div>
            </div>
          </div>
          <div class="item-content-right"></div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeAccount',
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    }),
    // 是否有套餐卡
    hasDinnerList () {
      return this.getHomeData.dinnerList.length > 0
    },
    // 套餐卡数组
    dinnerList () {
      return this.getHomeData.dinnerList
    },
    // 充值卡余额
    balance () {
      return this.getHomeData.balance || 0
    }
  },
  methods: {
    goPage (pageName) {
      this.$router.push({
        name: pageName
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-account {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 119px;
  display: flex;
  color: #8d8d8d;
}
.content {
  background: #fff;
  flex: 1;
  display: flex;
  font-size: 11px;
  border:1px solid #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #e6e6e6;
}
.recharge, .combo {
  flex: 1;
  margin-top: 18px;
  text-align: center;
  vertical-align: middle;
}
.left, .right{
  width: 10px;
}
.recharge img, .package {
  width: 25px;
  height: 25px;
}
.recharge .title, .combo .title {
  display: inline-block;
  vertical-align: top;
  padding-top: 5px;
  padding-left: 9px;
}
.recharge .money {
  font-size: 19px;
  font-weight: bold;
  color: #ed6575;
  margin-top: 15px;
}
.recharge .decimals {
  font-size: 11px;
}
.combo .item {
  margin-top: 10px;
  display: flex;
}
.combo .item-content {
  width: 100%;
  display: flex;
}
.average, .perfect, .more {
  flex: 1;
}
.item-content-left, .item-content-right {
  width: 40px;
}
.num {
  font-weight: bold;
  color: #ed6575;
  font-size: 17px;
}
.more {
  width: 12px;
  height: 3px;
  padding-bottom: 4px;
}
</style>
