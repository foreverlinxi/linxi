<template>
  <div class="check-bt">
    <div class="check-time"  v-for="check in NewsInfo" :key="check.index">
      <div class="check-rt"></div>
      <div class="check-content">
        <div class="time">
          <div class="time-wd">{{check.newsDate}}</div>
        </div>
        <div class="content">
          <div>
            <img class="check-top" src="./../../assets/images/meal/new.png">{{check.newsTitle}}</div>
          <div class="line"></div>
          <div class="content-car">
            <div class="car-info">
              <div>{{check.newsText}}</div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div class="check-rt"></div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'New',
  data () {
    return {
      NewsInfo: [],
      show: -1
    }
  },
  created () {
    this.queryCheckData()
  },
  methods: {
    queryCheckData () {
      this.$store.commit('setCheckParams', {
        paramsKey: 'newsList'
      })
      this.$store.dispatch('queryNewsData')
        .then((data) => {
          console.log(data)
          this.NewsInfo = data.newsList.reverse()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.check-top{
  padding: 10px 10px 10px 0px;
  background: #fff;
}
.check-top{
   vertical-align: middle;
    height: 20px;
    display: inline-block;
}
.check-time{
  display: flex;
  margin-top: 10px;
  width: 100%;
  color: #929292;
  border-radius: 10px;
}
.check-rt{
  width: 10px;
}
.check-content{
  flex: 1;
}
.time{
  width: 100%;
  font-size: 12px;
  margin-bottom: 10px;
}
.time-wd{
  width: 120px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  background: #C6C6C6;
  color: #F1F1F1;
  margin: auto;
}
.content{
  background: #fff;
  padding: 0px 10px;
  font-size: 12px;
  margin-right: 10px;
}
.content-car{
  display: flex;
}
.car-img{
  width: 20px;
  height: 20px;
  align-content: center;
  margin: 35px 24px;
}
.content-car-info{
}
.car-info{
  margin: 10px 0px;
  line-height: 20px;
}
.car-text{
  font-size: 14px;
  color: #3D3D3D;
}
.check-safa{
  width: 100%;
}
.check-safa div{
  display: inline-block;
}
.mark-down{
  float: right;
}
.mark-down img,.mark-down div{
  width: 19px;
  height: 19px;
  margin-left: 12px;
}
.mark-down-img{
  background-image: url('./../../assets/images/meal/check-down.png');
  background-size: 100% 100%;
}
.mark-up-img{
  background-image: url('./../../assets/images/meal/check-up.png');
  background-size: 100% 100%;
}
.line{
  width: 100%;
  height: 1px;
  background: #E5E5E5;
  /*border: 1px solid #E5E5E5;*/
}
.rt{
  float: right;
}
.rn{
  display: none;
}
.check-bt{
  margin-bottom: 80px;
}
</style>
