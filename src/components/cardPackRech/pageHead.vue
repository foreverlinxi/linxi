<template>
  <div class="head">
    <img src="../../assets/images/personal/rech.png">
    <div class="head_text">
      <div class="head_textName">回家养车套餐卡</div>
      <div class="server_name">
      </div>
      <div class="server_num">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageHead',
  data () {
    return {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  height: 175px;
  padding: 20px 20px 0 20px;
  background: #011924;
  position: relative;
}
.head>img{
  height: 100%;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.head_text{
  position: absolute;
  left: 0px;
  top: 20px;
  height: 100px;
  width: 100%;
  color: #ffffff;
}
.head_textName{
  padding-left: 40px;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  margin-left: 11px;
}
.server_name{
  width: 100%;
  height: 20px;
  font-size: 14px;
  text-align: center;
}
.server_name>div{
  display: inline-block;
}
.menueMargin{
  margin-left: 45px;
}
.server_num{
  height: 30px;
  padding:0 75px;
  font-size: 22px;
  display: -webkit-flex;
  display: flex;
}
.server_num>div{
  flex: 1;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
}
</style>
