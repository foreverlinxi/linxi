<template>
  <section class="section-item">
    <div class="section-content">
      <img class="wait-home" src="./../../assets/images/order/order-wait-home.jpg">
      <div class="content">
        <div class="content-title">{{orderInfo.serviceName}}(预约洗车)</div>
        <div class="content-item">漆面精洗／发动机精洗</div>
        <div class="content-item">内部精洗除尘/真皮护理...</div>
      </div>
      <div></div>
    </div>
  </section>
</template>

<script>
export default{
  name: 'OrderSetion',
  data () {
    return {
      //
    }
  },
  props: ['orderInfo'],
  created () {
    // console.log(11111)
  },
  methods: {
    //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section-item{
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .section-content{
    width: 96%;
    height: 80px;
    display: flex;
    align-items: center;
    background: rgb(251,251,251);
  }
  .wait-home{
    height: 60px;
    width: 60px;
    display: inline-block;
    vertical-align: middle;
    margin: 0px 15px 0px 15px;
  }
  .content{
    display: inline-block;
    font-size: 12px;
  }
  .content-title{
    margin-bottom: 8px;
  }
  .content-item{
    color: rgb(141,141,141);
  }
</style>
