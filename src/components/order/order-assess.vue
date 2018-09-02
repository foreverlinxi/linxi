<template>
  <div v-if="isDone">
    <div class="assess-title"></div>
    <div class="order-assess">
      <div class="order-border"></div>
      <section class="order-assess-info">
        <div class="order-from">
          <div class="assess-small-title">订单信息</div>
        </div>
        <div class="line"></div>
        <div class="order-from">
          <div class="">订单号码</div>
          <div class="assess-more">{{orderInfo.orderNo}}</div>
        </div>
        <div class="line"></div>
        <div class="order-from">
          <div>订单时间</div>
          <div class="assess-more">
            <span>{{orderInfo.createTime}}</span>
            <!-- <span>17:09:23</span> -->
          </div>
        </div>
        <div class="line"></div>
        <div class="order-from">
           <div>服务门店</div>
           <div class="assess-more">{{orderInfo.vehicleLocation}}</div>
        </div>
        <div class="line"></div>
        <div class="order-from">
          <div>服务技师</div>
          <div class="assess-more">{{orderInfo.techName}}</div>
        </div>
      </section>
      <div class="order-border"></div>
    </div>
    <div class="order-assess">
      <div class="order-border"></div>
      <section class="order-assess-info">
        <div class="order-from">
          <div class="assess-small-title">评分</div>
        </div>
        <div class="line"></div>
        <div class="order-from">
          <div>服务门店</div>
          <div class="assess-more">
            <div class="more-img" v-for="(star,index) in stars" :key="index"  :class="star.active ? 'more-img-star' : 'more-img-clarity'" @click="rating(index)"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="order-from">
          <div>服务技师</div>
          <div class="assess-more">
            <div class="more-img" v-for="(star,index) in thStars" :key="index"  :class="star.active ? 'more-img-star' : 'more-img-clarity'" @click="trating(index)"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="order-textarea">
          <textarea placeholder="请留下宝贵的建议和对我们服务的评价" id="evaluate"></textarea>
        </div>
      </section>
      <div class="order-border"></div>
    </div>
    <div class="order-submit" @click="submitAssess">提交</div>
  </div>
</template>

<script>
export default {
  name: 'OrderAssess',
  data () {
    return {
      orderInfo: {},
      stars: [
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false}
      ],
      thStars: [
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false}
      ],
      starNum: 0,
      thStarNum: 0,
      isDone: false
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      // this.orderInfo = this.$route.query.orderInfo
      this.isDone = true
    },
    rating (index) {
      let total = this.stars.length
      let idx = index + 1
      if (this.starNum === 0) {
        this.starNum = idx
        for (let i = 0; i < idx; i++) {
          this.stars[i].active = true
        }
      }
      if (idx === this.starNum) {
        for (let i = index; i < total; i++) {
          this.stars[i].active = false
        }
      }
      // 如果小于当前最高星级，则直接保留当前星级
      if (idx < this.starNum) {
        for (let i = idx; i < this.starNum; i++) {
          this.stars[i].active = false
        }
      }
      // 如果大于当前星级，则直接选到该星级
      if (idx > this.starNum) {
        for (let i = 0; i < idx; i++) {
          this.stars[i].active = true
        }
      }

      var count = 0 // 计数器-统计当前有几颗星
      for (let i = 0; i < total; i++) {
        if (this.stars[i].active) {
          count++
        }
      }
      this.starNum = count
      console.log(this.starNum)
    },
    trating (index) {
      let total = this.thStars.length
      let idx = index + 1
      if (this.thStarNum === 0) {
        this.thStarNum = idx
        for (let i = 0; i < idx; i++) {
          this.thStars[i].active = true
        }
      }
      if (idx === this.thStarNum) {
        for (let i = index; i < total; i++) {
          this.thStars[i].active = false
        }
      }
      // 如果小于当前最高星级，则直接保留当前星级
      if (idx < this.thStarNum) {
        for (let i = idx; i < this.thStarNum; i++) {
          this.thStars[i].active = false
        }
      }
      // 如果大于当前星级，则直接选到该星级
      if (idx > this.thStarNum) {
        for (let i = 0; i < idx; i++) {
          this.thStars[i].active = true
        }
      }

      var count = 0 // 计数器-统计当前有几颗星
      for (let i = 0; i < total; i++) {
        if (this.thStars[i].active) {
          count++
        }
      }
      this.thStarNum = count
      console.log(this.thStarNum)
    },
    submitAssess () {
      if (!this.thStarNum || !this.starNum || !document.getElementById('evaluate').value) {
        this.$tip.show({
          message: '技师评分、门店评分，建议需填写完整'
        })
        return
      }
      let submitInfo = this.orderInfo
      this.$store.commit('setOrderParams', {
        paramsKey: 'submitSsionData',
        techId: submitInfo.techId,
        techScore: this.thStarNum,
        orgScore: this.starNum,
        rankText: document.getElementById('evaluate').value,
        orderNo: submitInfo.orderNo
      })
      this.$store.dispatch('sibmitSsion')
        .then((data) => {
          this.myBalance = data.myBalance
        })
    }
  }
}
</script>
<style scoped="">
  .assess-title{
    width: 100%;
    height: 10px;
  }
  .order-assess{
    display: flex;
    font-size: 12px;
    color: #9E9E9E;
    margin-bottom: 10px;
  }
  .order-border{
    width: 10px;
  }
  .assess-small-title{
    color: #3D3D3D;
    font-size: 14px;
    font-weight: bold;
  }
  .order-assess-info{
    flex: 1;
    background: #fff;
    padding: 5px 25px;
  }
  .order-from{
    height: 36px;
    line-height: 36px;
  }
  .assess-more{
    display: inline-block;
    vertical-align: middle;
    float: right;
  }
  .order-from div{
    display: inline-block;
  }
  .line{
    height: 1px;
    background: #f0f0f0;
  }
  .order-textarea{
    padding: 15px 30px;
    background: rgb(240, 240, 240);
  }
  textarea{
    background: rgb(240, 240, 240);
    width: 100%;
    height: 100px;
  }
  .more-img{
    width: 16px;
    height: 16px;
    margin-left: 3px;
    background-size: 100%;
  }
  .more-img-star{
    background-image: url(./../../assets/images/order/order-star.png);
  }
  .more-img-clarity{
    background-image: url(./../../assets/images/order/order-clarity.png);
  }
  .order-submit{
    width: 90%;
    text-align: center;
    margin: auto;
    height: 45px;
    line-height: 45px;
    background: rgb(95, 197, 241);
    border-radius: 5px;
    color: #fff;
    margin-top: 50px;
  }
</style>
