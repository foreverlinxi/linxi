<template>
  <div v-if="isDone">
    <div class="file-title"></div>
    <div class="file-content">
      <div class="file-rt"></div>
      <div class="content">
        <div class="file-content-title">
          <div class="fz">基本信息</div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">车牌号</div>
          <div class="file-more" style="">
             <input class="file-car-name" type="text" name="" placeholder="粤" maxlength="1" v-model='writeData.carNoName' disabled="disabled"><span style="margin-right:10px;display:inline-block">|</span>
            <input type="text" style="width:110px;display:inline-block" name="" placeholder="请输入" v-model="writeData.carNoNum" disabled="disabled">
          </div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">品牌车系</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.seriesName" disabled="disabled"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">车型</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.carSeries" disabled="disabled"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">行驶里程</div>
          <div class="file-more"><input type="number" name="" placeholder="请输入" v-model="writeData.mileage" maxlength="100"></div>
        </div>
        <div class="file-keep" :class="{'bg':writeData.carNo && writeData.seriesName && writeData.carSeries && writeData.mileage}" @click="submitDriver('code1')">保存</div>
      </div>
      <div class="file-rt"></div>
    </div>
    <div class="file-content">
      <div class="file-rt"></div>
      <div class="content">
        <div class="file-content-title">
          <div class="fz">行驶证</div>
          <div class="file-explain">用于违章、年检、车险等</div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">使用性质</div>
          <div class="file-more">
            <div class="file-nature" :class="{'file-keep-sm': writeData.useProperty != 1}" @click="chooseBeIn1('one')">运营</div>
            <div class="file-nature" :class="{'file-keep-sm': writeData.useProperty == 1}" @click="chooseBeIn1('two')">非运营</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">车辆识别代号</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.chassisNumber" maxlength="17"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">发动机号</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.engineNo" maxlength="40"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">注册日期</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.createTime" maxlength="20"></div>
        </div>
        <div class="file-keep" :class="{'bg':writeData.chassisNumber && writeData.engineNo && writeData.createTime}" @click="submitDriver('code2')">保存</div>
      </div>
      <div class="file-rt"></div>
    </div>
    <div class="file-content">
      <div class="file-rt"></div>
      <div class="content">
        <div class="file-content-title">
          <div class="fz">驾驶证信息</div>
          <div class="file-explain">用于驾照查分</div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">驾驶证号</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.driverNumber" maxlength="50"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">姓名</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.userName" maxlength="50"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div class="file-from-wd">初次领证日期</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.firstCard" maxlength="50"></div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div style="width:100px">档案编号</div>
          <div class="file-more"><input type="" name="" placeholder="请输入" v-model="writeData.fileNumber" maxlength="100"></div>
        </div>
        <div class="file-keep" :class="{'bg':writeData.driverNumber && writeData.userName && writeData.firstCard && writeData.fileNumber}" @click="submitDriver('code3')">保存</div>
      </div>
      <div class="file-rt"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CarWriteInfo',
  data () {
    return {
      writeData: {
        useProperty: 1,
        carNo: '11'
      },
      isDone: true
    }
  },
  created () {
    this.getWriteData()
  },
  methods: {
    getWriteData () {
      this.writeData = this.$route.query.CarWriteData
      this.writeData.carNoNum = this.writeData.carNo.slice(1)
      this.writeData.carNoName = this.writeData.carNo.substring(0, 1)
      this.isDone = true
      console.log(this.$route.query.CarWriteData)
    },
    submitDriver (code) {
      if (code === 'code1') {
        if (!this.writeData.seriesName || !this.writeData.carSeries || !this.writeData.mileage) {
          this.$tip.show({
            message: '行驶证证信息需填写完整'
          })
          return
        }
        this.$store.commit('setCarParams', {
          paramsKey: 'updateCarParams',
          code: '1',
          carNo: this.writeData.carNo,
          seriesName: this.writeData.seriesName,
          carSeries: this.writeData.carSeries,
          mileage: this.writeData.mileage
        })
        this.$store.dispatch('updateCar')
          .then((data) => {
            this.$router.go(-1)
          })
      }
      if (code === 'code2') {
        if (!this.writeData.engineNo || !this.writeData.createTime || !this.writeData.chassisNumber) {
          this.$tip.show({
            message: '行驶证证信息需填写完整'
          })
          return
        }
        this.$store.commit('setCarParams', {
          paramsKey: 'updateCarParams',
          code: '2',
          carNo: this.writeData.carNo,
          useProperty: this.writeData.useProperty,
          engineNo: this.writeData.engineNo,
          createTime: this.writeData.createTime,
          chassisNumber: this.writeData.chassisNumber
        })
        this.$store.dispatch('updateCar')
          .then((data) => {
            this.$router.go(-1)
          })
      }
      if (code === 'code3') {
        if (!this.writeData.driverNumber || !this.writeData.userName || !this.writeData.firstCard || !this.writeData.fileNumber) {
          this.$tip.show({
            message: '驾驶证信息需填写完整'
          })
          return
        }
        this.$store.commit('setCarParams', {
          paramsKey: 'updateCarParams',
          code: '3',
          carNo: this.writeData.carNo,
          driverNumber: this.writeData.driverNumber,
          userName: this.writeData.userName,
          firstCard: this.writeData.firstCard,
          fileNumber: this.writeData.fileNumber
        })
        this.$store.dispatch('updateCar')
          .then((data) => {
            this.$router.go(-1)
          })
      }
    },
    chooseBeIn1 (text) {
      console.log(text, this.writeData.useProperty)
      if (text === 'one' && this.writeData.useProperty === 1) {
        this.writeData.useProperty = 0
        return
      }
      this.writeData.useProperty = 1
    }
  }
}
</script>
<style scoped="">
  .file-title{
    width: 100%;
    height: 10px;
  }
  .file-rt{
    width: 10px;
  }
  .file-content{
    display: flex;
    margin-bottom: 10px;
  }
  .cr{
    color: #5AC4F3;
  }
  .content{
    flex: 1;
    background: #fff;
    padding: 5px 25px;
  }
  .file-from{
    height: 35px;
    line-height: 35px;
    color: rgb(141, 141, 141);
    font-size: 12px;
  }
  .file-more{
    display: inline-block;
    vertical-align: middle;
  }
  .file-from div{
    display: inline-block;
  }
  .file-from-wd{
    width: 100px;
  }
  .file-content-title{
    height: 40px;
    line-height: 40px;
  }
  .line{
    height: 1px;
    background: #f0f0f0;
    margin-bottom: 5px;
  }
  .file-content-title div{
    display: inline-block;
  }
  .file-explain{
    color: rgb(141, 141, 141);
    margin-left: 20px;
    font-size: 12px;
  }
  .write-img{
    width: 16px;
    height: 16px;
    background-image: url(./../../assets/images/meal/file-write.png);
    background-size: 100%;
  }
  .file-nature{
    width: 52px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid rgb(141, 141, 141);
    border-radius: 4px;
    font-size: 14px;
    margin-right: 18px;
  }
  .file-keep{
    width: 90%;
    text-align: center;
    margin: auto;
    height: 30px;
    line-height: 30px;
    /*background: rgb(95, 197, 241);*/
    border: 1px solid rgb(95, 197, 241);
    border-radius: 25px;
    color: rgb(95, 197, 241);
    margin: 15px 0px;
    font-size: 13px;
  }
  .file-keep-sm{
    color: rgb(95, 197, 241);
    border: 1px solid rgb(95, 197, 241);
  }
  .file-car-name{
    width: 14px;
    margin-right: 15px;
  }
  .fz{
    font-size: 14px;
  }
  input{
    color:#68C9F4;
  }
  .bg{
    background: rgb(95, 197, 241);
    color: #fff;
  }
</style>
