<template>
  <div class="service-list" v-if="isDone">
    <div class="left"></div>
    <div class="content">
      <div class="item" v-for="(item, index) in serviceList" @click="goService(item.serverId)" :key="index">
        <div class="title trim">{{item.serverName}}</div>
        <div class="picture">
          <img :src="item.serverImg" />
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IMGBASEURL } from '../../store/url'
import Lockr from 'lockr'

export default {
  name: 'ServiceList',
  data () {
    return {
      isDone: false,
      serviceList: []
    }
  },
  created () {
    this.queryBeautyList()
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    })
  },
  methods: {
    // 查询美容服务列表接口
    queryBeautyList () {
      this.$store.commit('setServiceParams', {
        paramsKey: 'queryBeautyListParams',
        orgId: this.getHomeData.orgId,
        // orgId: '35',
        // serverType: '1'
        serverType: this.$route.query.type
      })
      this.$store.dispatch('queryBeautyList')
        .then((data) => {
          data.serverList.forEach((item) => {
            item.serverImg = IMGBASEURL + item.serverImg
          })
          this.serviceList = data.serverList
          this.isDone = true
        })
    },
    // serverType: 1.洗车服务 4.内饰服务 5.漆面服务 6.玻璃护理
    goService (serverType) {
      // 删掉之前保留的优惠券本地数据
      Lockr.rm('activeCoupon')
      this.$router.push({
        name: 'ServiceOrderIndex',
        query: {
          serverType: serverType,
          type: this.$route.query.type
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.service-list {
  display: flex;
  height: 600px;
}
.left, .right {
  width: 10px;
  margin-top: 10px;
}
.content {
  flex: 1;
  width: 100%;
  margin-top: 10px;
}
.item {
  height: 180px;
  background: #fff;
  margin-bottom: 10px;
}
.title {
  height: 70px;
  font-size: 19px;
  line-height: 70px;
  text-align: center;
  font-weight: bold;
}
.picture {
  height: 70px;
}
.picture>img {
  width: 100%;
  height: 100%;
}
.trim {
  color: #5ac4f3;
}
.lacuqer {
  color: #d10441;
}
.galss {
  color: #d7ae04;
}
</style>
