<template>
  <div>
    <div class="service-order-location">
      <div class="left"></div>
      <div class="content">
        <div class="item" :class="hasShopName ? '' : 'selectShop'">
          <img src="./../../assets/images/service/beauty-house.png" />
          <span>{{shopName}}</span>
        </div>
        <div style="width: 10px;display: inline-block;"></div>
        <div class="item" :class="hasCarNo ? '' : 'selectCarNo'" @click="goCarAdd">
          <img src="./../../assets/images/service/beauty-car.png" />
          <span>{{carMessage.carNo}}</span>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceOrderShopCarnum',
  data () {
    return {
    }
  },
  props: ['carMessage'],
  computed: {
    ...mapGetters({
      getWashBeauty: 'getWashBeauty',
      getHomeData: 'getHomeData'
    }),
    shopName () {
      return this.getHomeData.orgName || '选择门店'
    },
    hasCarNo () {
      return this.carMessage.carNo !== '选择车辆'
    },
    hasShopName () {
      return this.shopName !== '选择门店'
    }
  },
  methods: {
    // 取添加车辆页面
    goCarAdd () {
      this.$router.push({
        name: 'CarCheck',
        query: {
          fromPage: 'service'
        }
      })
    },
    // 取选择地址页面
    goSelectLocation () {
      this.$router.push({
        name: 'Location',
        query: {
          returnPage: 'ServiceOrderIndex',
          serverType: this.$route.query.serverType
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.service-order-location {
  display: flex;
  width: 100%;
}
.content {
  flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  height: 50px;
}
.item {
  flex: 1;
  background: #fff;
  display: inline-block;
  text-align: center;
  line-height: 50px;
}
.item>img {
  width: 17.5px;
  height: 17.5px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.item>span {
  vertical-align: middle;
  font-size: 15px;
}
.left, .right {
  width: 10px;
}
.selectShop {
  background: #5ac4f3;
}
.selectCarNo {
  background: #e8bd42;
}
</style>
