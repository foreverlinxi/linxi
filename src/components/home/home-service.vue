<template>
  <div class="home-service">
    <div class="home-service-content">
      <!-- 上面一行 -->
      <div class="up-row">
        <div class="item wash-car" @click="goService">
          <img src="./../../assets/images/home/wash-car.png"/>
          <div>回家洗车</div>
        </div>
        <div class="middle"></div>
        <div class="item beautify" @click="goBeautify">
          <img src="./../../assets/images/home/beautify.png"/>
          <div>回家美容</div>
        </div>
      </div>
      <!-- 中间10px留白 -->
      <div style="height: 10px;width: 100%;"></div>
      <!-- 下面一行 -->
      <div class="down-row">
        <div class="item insurance">
          <img src="./../../assets/images/home/insurance.png"/>
          <div>车辆保险</div>
        </div>
        <div class="middle"></div>
        <div class="item traffic-inquiry">
          <img src="./../../assets/images/home/traffic-inquiry.png"/>
          <div>违章查询</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeService',
  data () {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    }),
    // 是否有小区地址返回
    hasShopName () {
      return this.getHomeData.orgName && this.getHomeData.orgId
    }
  },
  methods: {
    // 服务列表页
    goBeautify () {
      if (this.goSelectLocation()) return
      this.$router.push({
        name: 'ServiceList',
        query: {
          type: '2' // 1洗车，2美容
        }
      })
    },
    // 回家洗车
    goService () {
      if (this.goSelectLocation()) return
      this.$router.push({
        name: 'ServiceList',
        query: {
          type: '1' // 1洗车，2美容
        }
      })
    },
    // 去选择地址页面
    goSelectLocation () {
      if (!this.hasShopName) {
        this.$dialog.show({
          message: '请先选择您的服务地址',
          confirmCallback: () => {
            this.$router.push({
              name: 'Location'
            })
          }
        })
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-service {
  width: 100%;
  height: 210px;
  display: flex;
  background: #fff;
  font-size: 14px;
  color: #fff;
  letter-spacing: 2px;
  /* border-top: 1px solid #f4f4f4; */
  margin-top: 10px;
}
.home-service-content {
  margin: 10px 10px;
  width: 100%;
  height: 190px;
}
.up-row {
  width: 100%;
  height: 90px;
  display: flex;
}
.down-row {
  width: 100%;
  height: 90px;
  display: flex;
}
.item-list {
  width: 100%;
}
.left, .middle, .right{
  width: 10px;
}
.item {
  flex: 1;
  text-align: center;
  border-radius: 5px;
}
.wash-car {
  background: #ed6575;
}
.beautify {
  background: #58c3f2;
}
.insurance {
  background: #28dfcc;
}
.traffic-inquiry {
  background: #e8bd42;
}
img {
  width: 43px;
  height: 43px;
  margin-top: 15px;
}
</style>
