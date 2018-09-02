<template>
  <div class="home-banner" :style="{height: showLocation ? '190px' : '164px'}">
    <div class="left"></div>
    <div class="picture">
      <div class="banner-area">
        <!-- 轮播插件 -->
        <swiper :options="swiperOption" ref="mySwiper" class="banner" :style="{width: clientWidth}">
          <!-- slides -->
          <swiper-slide v-for="item in getHomeData.bannerList" :key="item.index">
            <a :href="item.bannerLink"><img class="banner" :style="{width: clientWidth}" :src="item.bannerUrl" /></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="location" v-if="showLocation" @click="goLocationPage">
        <img class="location-logo" src="./../../assets/images/home/location.png" />
        <span class="city">{{getHomeData.cityName}}</span>
        <span class="address">{{getHomeData.orgName}}</span>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'HomeBanner',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        spaceBetween: 30,
        loop: true
      }
    }
  },
  computed: {
    ...mapGetters({
      getHomeData: 'getHomeData'
    }),
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    clientWidth () {
      return document.body.clientWidth - 20 + 'px'
    },
    // 是否展示门店地址
    showLocation () {
      return this.getHomeData.cityName && this.getHomeData.orgName
    }
  },
  methods: {
    goLocationPage () {
      this.$router.push({
        name: 'Location'
      })
    }
  },
  mounted () {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    this.swiper.slideTo(0, 0, false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-banner {
  padding-top: 10px;
  background: #fff;
  width: 100%;
  height: 190px;
  display: flex;
}
.left, .right{
  width: 10px;
}
.picture {
  flex: 1;
}
.banner-area {
  height: 152px;
}
.banner{
  height: 152px;
  border-radius: 5px;
}
.location {
  margin-top: 8px;
  text-align: center;
}
.location-logo {
  width: 8.5px;
  height: 13px;
}
.picture span {
  font-size: 14px;
  color: #8d8d8d;
  vertical-align: top;
}
.city, .address {
  display: inline-block;
  margin-top: 1px;
}
.address {
  margin-left: 5px;
}
</style>
