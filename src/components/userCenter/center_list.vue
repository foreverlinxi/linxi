<template>
  <div>
    <div v-for="(item, index) in pageList" :key="index">
      <div class="list" @click="goPage(item.jumpPageName)">
        <div class="list_image_div">
          <img :src="item.logoName">
        </div>
        <div class="list_content">
          {{item.title}}
          <span v-if="item.msg && user_msg">(<label class="text_red">{{user_msg}}</label>)</span>
        </div>
        <div class="arrow_div">
          <span class="right_arrow"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'center_head',
  props: ['user_msg'],
  data: function () {
    return {
      pageList: [
        {
          title: '我的订单',
          jumpPageName: 'OrderStatus',
          logoName: require('../../assets/images/personal/personal-order.png')
        },
        {
          title: '我的车辆',
          jumpPageName: 'CarCheck',
          logoName: require('../../assets/images/personal/personal-car.png')
        },
        {
          title: '服务地址',
          jumpPageName: 'AddressList',
          logoName: require('../../assets/images/personal/personal-adress.png')
        },
        {
          title: '消费明细',
          jumpPageName: 'DetaillList',
          logoName: require('../../assets/images/personal/personal-talk.png')
        },
        {
          title: '我的消息',
          jumpPageName: 'New',
          logoName: require('../../assets/images/personal/personal-news.png'),
          msg: 'Y'
        }
      ]
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
    goPage (pageName) {
      if ((pageName === 'AddressList') && this.goSelectLocation()) return
      this.$router.push({
        name: pageName
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
.list{
  background: white;
  margin-bottom: 5px;
  border-radius: 4px;
  display: -webkit-flex;
  display: flex;
  font-size: 16px;
  color: #808080;
}
.list_image_div{
  height: 50px;
  width: 63px;
  line-height: 50px;
  vertical-align: middle;
  text-align: center;
  border-radius: 4px;
}
.list_image_div>img{
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
}
.list_content{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  border-radius: 4px;
  flex:1;
}
.arrow_div{
  width: 30px;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
}
.right_arrow{
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #727272;
  border-top: 2px solid #727272;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg);/* IE 9 */
  -moz-transform:rotate(45deg);/* Firefox */
  -webkit-transform:rotate(45deg);/* Safari 和 Chrome */
  -o-transform:rotate(45deg);/* Opera */
}
.text_red{
  color: red;
}
</style>
