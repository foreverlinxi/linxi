<template>
  <div>
    <!-- 选择取车时间 -->
    <div class="select-car-time">
      <div class="title">
        <span>选择取车时间</span>
      </div>
      <div class="select-item">
        <div class="select-item-left"></div>
        <div class="select-item-middle">
          <div class="item-button" @click="queryFreeDate" :class="lightPickCar ? 'selected-button' : ''">预约养车</div>
          <div class="item-space"></div>
          <div class="item-button" @click="nightPickCar" :class="lightPickCar ? '' : 'selected-button'">夜洗晨取</div>
        </div>
        <div class="select-item-right"></div>
      </div>
      <div class="message" :class="hasSelectTime ? 'selected' : ''">{{message}}</div>
      <div class="select-item-line">
        <div class="select-item-line-left"></div>
        <div class="select-item-line-middle"></div>
        <div class="select-item-line-right"></div>
      </div>
    </div>
    <!-- 选车取车时间弹出框 -->
    <div class="time-list-dialog" v-if="showTimeList">
      <div class="list-area">
        <div class="list-area-title">
          <span>选择取车时间</span>
          <img src="./../../assets/images/service/close.png" @click="closeTimeList"/>
        </div>
        <div class="list-area-content" v-if="!isFull">
          <div class="list-area-content-left"></div>
          <div class="list-area-content-middle">
            <ul style="margin-top: 20px;">
              <li style="list-style:none" v-for="(items, index) in timeList" :key="index" @click="selectTime(items.time, items.date)">
                <div class="time-item">{{items.time}}</div>
              </li>
            </ul>
          </div>
          <div class="list-area-content-right"></div>
        </div>
        <div class="cannot-order" v-else>
          <div class="cannot-order-logo">
            <img src="./../../assets/images/service/warning.png" />
          </div>
          <div class="cannot-order-tip">抱歉！今日技师服务已满，无法预约。</div>
        </div>
      </div>
    </div>
    <!-- 停车位置 -->
    <div class="car-address">
      <div class="title">
        <span>停车位置</span>
      </div>
      <div class="address-input">
        <div class="address-left"></div>
        <div class="address-input-content">
          <input type="text" placeholder="请输入停车位置" @blur="setVehicleLocation($event)"/>
        </div>
        <div class="address-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceOrderTimeLocation',
  data () {
    return {
      // 技师预约是否满了，默认未满
      isFull: false,
      // 展示选择取车时间dialog
      showTimeList: false,
      message: '注：点击预约养车了解取车时间。',
      hasSelectTime: false,
      timeList: [],
      // 默认日间取车
      lightPickCar: true
    }
  },
  props: ['goodsDate', 'appointmentTime', 'setAppointmentTime', 'setVehicleLocation'],
  computed: {
    ...mapGetters({
      getWashBeauty: 'getWashBeauty',
      getHomeData: 'getHomeData',
      getSubmisson: 'getSubmisson'
    })
  },
  watch: {
    appointmentTime (newVal) {
      if (newVal === '') {
        this.message = '注：点击日间取车选择取车时间。'
        this.hasSelectTime = false
        this.lightPickCar = true
      }
    },
    getSubmisson (newVal) {
      if (newVal.serverStatus === '0') {
        // 展示今日服务已满的状态
        this.setFullStatus()
      }
    }
  },
  activated () {
    if (String(this.getWashBeauty.serverStatus) === '0') {
      // 展示今日服务已满的状态
      this.setFullStatus()
    }
  },
  methods: {
    // 查询门店空闲时间
    queryFreeDate () {
      this.$store.commit('setServiceParams', {
        paramsKey: 'queryFreeDateParams',
        orgId: this.getHomeData.orgId || '',
        goodsDate: this.goodsDate
      })
      this.$store.dispatch('queryFreeDate')
        .then((data) => {
          if (data.make === 'N') {
            // 展示今日服务已满的状态
            this.setFullStatus()
          } else {
            // 显示取车时间
            // this.showTimeList = true
            // this.timeList = data.isFreeTech
            this.message = '前面有' + data.carFree + '辆车在等待服务，约等待' + data.isFreeTech + '小时即可取车'
            this.hasSelectTime = true
            // 改变按钮颜色
            this.lightPickCar = true
          }
        })
    },
    // 展示今日服务已满的状态
    setFullStatus () {
      this.showTimeList = true
      this.isFull = true
      this.message = '抱歉！今日服务已满，无法预约。'
    },
    // 关闭选择取车时间dialog
    closeTimeList () {
      if (this.isFull) {
        this.$router.push({
          name: 'Home'
        })
      } else {
        this.showTimeList = false
      }
    },
    // 选择取车时间item
    selectTime (time, date) {
      this.closeTimeList()
      this.message = `注：取车时间为本日${time}。`
      // 改变提示字体颜色为蓝色
      this.hasSelectTime = true
      // 改变按钮颜色
      this.lightPickCar = true
      this.setAppointmentTime(date)
    },
    // 晚上取车按钮
    nightPickCar () {
      this.message = `注：取车时间为次日凌晨5:00。`
      // 改变提示字体颜色为蓝色
      this.hasSelectTime = true
      // 改变按钮颜色
      this.lightPickCar = false
      // 获取第二天时间
      let newDate = new Date()
      let year = newDate.getFullYear()
      let month = newDate.getMonth() + 1
      let day = newDate.getDate() + 1
      this.setAppointmentTime(`${year}-${month}-${day} 5:00`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body.dialog-open {
  position: fixed;
  width: 100%;
}
.select-car-time {
  height: 100px;
  background: #fff;
}
.select-item {
  display: flex;
  height: 35px;
}
.select-item-middle {
  background: #fff;
  flex: 1;
  height: 35px;
  display: flex;
}
.select-item-left, .select-item-right{
  width: 70px;
}
.item-button {
  flex: 1;
  border-radius: 2px;
  background: #f0f0f0;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
}
.item-space {
  width: 35px;
}
.message {
  height: 33px;
  text-align: center;
  line-height: 33px;
  font-size: 12px;
  color: #ed6575;
}
.selected {
  color: #5ac4f3;
}
.selected-button {
  background: #5ac4f3;
  color: #fff;
}
.select-item-line {
  display: flex;
}
.select-item-line-left, .select-item-line-right {
  height: 2px;
  width: 25px;
}
.select-item-line-middle {
  height: 2px;
  flex: 1;
  background: #f0f0f0;
}

.time-list-dialog {
  height: 100%;
  width: 100%;
  background-color:rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.list-area {
  height: 312.5px;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
}
.list-area-title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 2px solid #f0f0f0;
}
.list-area-title>span {
  margin-left: 35px;
}
.list-area-title img {
  width: 15px;
  height: 15px;
  float: right;
  margin-top: 18px;
  margin-right: 20px;
}
.list-area-content {
  display: flex;
  height: 262.5px;
}
.list-area-content-left, .list-area-content-right {
  width: 20px;
}
.list-area-content-middle {
  flex: 1;
  overflow: auto;
}
.time-item {
  width: 100%;
  background: #ecfaff;
  height: 45px;
  text-align: center;
  line-height: 45px;
  margin-bottom: 14px;
  border-radius: 5px;
}
.active {
  background: #5ac4f3;
  color: #fff;
}
.cannot-order {
  height: 262.5px;
  text-align: center;
}
.cannot-order-logo {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 25px;
}
.cannot-order img{
  width: 52px;
  height: 52px;
}
.cannot-order-tip {
  font-size: 14px;
}

.car-address {
  height: 70px;
  background: #fff;
}
.title {
  height: 30px;
  color: #6f6f6f;
}
.title>span {
  margin-left: 25px;
  margin-top: 9px;
  display: inline-block;
  font-size: 12px;
}
.address-left, .address-right {
  width: 63px;
}
.address-input {
  display: flex;
  height: 40px;
}
.address-input-content {
  flex: 1;
}
.address-input-content>input {
  width: 100%;
  height: 30px;
  background: #f0f0f0;
  font-size: 10px;
  text-align: center;
}
</style>
