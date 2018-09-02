<template>
  <div class="project-item" v-if="itemObj.goodsName">
    <div class="item-content" :class="{active: itemObj.isActive}" @click="selectProject(itemObj.goodsName)">
      <div class="title">{{itemObj.goodsName}}</div>
      <div class="pay">¥ {{itemObj.goodsMoney}}</div>
    </div>
    <div class="item-detail">
      <div class="item-detail-table-cell">
        <div class="detail-button" @click="showServiceDetail">服务详情</div>
      </div>
    </div>
    <div class="item-dialog" v-if="showDialog">
      <div class="top-space"></div>
      <div class="dialog-content">
        <div class="left"></div>
        <div class="middle">
          <div class="dialog-title">
            <span>回家普洗</span>
            <img src="./../../assets/images/meal/my-fork.png" @click="closeDialog"/>
          </div>
          <div class="dialog-detail">
            <div class="dialog-detail-left"></div>
            <div class="dialog-detail-middle">
              <div class="service-detail">
                <div class="service-detail-title">
                  <img src="./../../assets/images/service/car-wash-tag.png"/>
                  <span>服务内容</span>
                </div>
                <!-- <div class="service-detail-content">车身清洁、轮毂清洗、轮胎护理、内室除尘、内饰清洁、脚垫清洁、胎压检查、雨刷精添加、水箱水检查、发动机外部吹尘</div> -->
                <div class="service-detail-content">{{itemObj.goodsText}}</div>
              </div>
              <div class="service-point">
                <div class="service-detail-title">
                  <img src="./../../assets/images/service/car-wash-point.png"/>
                  <span>服务亮点</span>
                </div>
                <div class="service-detail-content">
                  {{itemObj.lightContent}}
                  <!-- <div>1、超倍蜡水，去污，上光，增艳</div>
                  <div>2、安全检查胎压</div>
                  <div>3、轮毂靓丽，轮胎如新</div>
                  <div>4、内饰消毒毛巾一车一换</div>
                  <div>5、5条毛巾擦车干净卫生</div>
                  <div>6、中控仪表无尘干净整洁</div> -->
                </div>
              </div>
              <div class="service-time">
                <div class="service-detail-title">
                  <img src="./../../assets/images/service/car-wash-time.png"/>
                  <span>服务时间</span>
                </div>
                <div class="service-detail-content">{{itemObj.goodsDate}}分钟</div>
              </div>
            </div>
            <div class="dialog-detail-right"></div>
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="bottom-space"></div>
    </div>
  </div>
  <!-- 空白填充 -->
  <div class="project-item" v-else></div>
</template>

<script>

export default {
  name: 'ServiceOrderProject',
  data () {
    return {
      showDialog: false
    }
  },
  props: ['itemObj', 'selectProject'],
  methods: {
    showServiceDetail () {
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-item {
  height: 105px;
  flex: 1;
  margin-right: 10px;
}
.item-content {
  height: 60px;
  background: #f0f0f0;
  text-align: center;
  color: #000000;
}
.active {
  background: #5ac4f3;
  color: #fff;
}
.title {
  padding-top: 10px;
}
.pay {
  font-size: 13px;
}
.item-detail {
  height: 45px;
  background: #fff;
  font-size: 11px;
  color: #5ac4f3;
  display: table;
  width: 100%;
}
.item-detail-table-cell {
  display: table-cell;
  vertical-align: middle;
}
.detail-button {
  margin-right: auto;
  margin-left: auto;
  line-height: 23px;
  width: 60px;
  height: 23px;
  background: #ecfaff;
  border-radius: 2px;
  border: 1px solid #5ac4f3;
  text-align: center;
}
.item-dialog {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color:rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  flex-direction: column;
}
.top-space, .bottom-space {
  flex: 1;
}
.dialog-content {
  display: flex;
  height: 350px;
  opacity: 1;
  z-index: 51;
}
.middle {
  flex: 1;
  background: #fff;
  border-radius: 5px;
}
.left, .right {
  width: 36px;
}
.dialog-title {
  height: 40px;
  background: linear-gradient(to right, #77b5ff, #5ac3f4);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #fff;
  font-size: 17px;
  line-height: 40px;
}
.dialog-title>span {
  margin-left: 19px;
}
.dialog-title>img {
  height: 25px;
  width: 25px;
  float: right;
  margin-top: 8px;
  margin-right: 15px;
}
.dialog-detail {
  display: flex;
  height: 310px;
}
.dialog-detail-left, .dialog-detail-right {
  width: 22px;
}
.dialog-detail-middle {
  flex: 1;
}
.service-detail {
  height: 90px;
}
.service-point {
  height: 135px;
}
.service-time {
  height: 85px;
}
.service-detail-content {
  font-size: 12px;
  color: #8d8d8d;
  line-height: 15px;
  padding-top: 5px;
}
.service-detail-title {
  padding-top: 15px;
}
.service-detail-title>img {
  width: 16px;
  height: 17px;
  line-height: 17px;
  vertical-align: middle;
}
.service-detail-title>span {
  font-size: 17px;
  vertical-align: top;
}
</style>
