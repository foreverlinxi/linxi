<template>
  <div v-if="isDone">
    <div class="file-title"></div>
    <div class="file-content">
      <div class="file-rt"></div>
      <div class="content">
        <div class="file-content-title">
          <div>基本信息</div>
          <div class="file-more" @click="goWrite(carFileDta)">
            <div class="write-img"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div>车牌号</div>
          <div class="file-more" :class="{'cr':carFileDta.carNo}">{{carFileDta.carNo || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>品牌车系</div>
          <div class="file-more" :class="{'cr':carFileDta.seriesName}">{{carFileDta.seriesName || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>车型</div>
          <div class="file-more" :class="{'cr':carFileDta.carSeries}">{{carFileDta.carSeries || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>行驶里程</div>
          <div class="file-more" :class="{'cr':carFileDta.mileage}">{{carFileDta.mileage || '未填写'}}</div>
        </div>
      </div>
      <div class="file-rt"></div>
    </div>
    <div class="file-content">
      <div class="file-rt"></div>
      <div class="content">
        <div class="file-content-title">
          <div>行驶证</div>
          <div class="file-explain">用于违章、年检、车险等</div>
          <div class="file-more" @click="goWrite(carFileDta)">
            <div class="write-img"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div>使用性质</div>
          <div class="file-more cr">{{carFileDta.useProperty ? "运营":"非运营" || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>车辆识别代号</div>
          <div class="file-more" :class="{'cr':carFileDta.chassisNumber}">{{carFileDta.chassisNumber || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>发动机号</div>
          <div class="file-more" :class="{'cr':carFileDta.engineNo}">{{carFileDta.engineNo || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>注册日期</div>
          <div class="file-more" :class="{'cr':carFileDta.createTime}">{{carFileDta.createTime  || '未填写'}}</div>
        </div>
      </div>
      <div class="file-rt"></div>
    </div>
    <div class="file-content">
      <div class="file-rt"></div>
      <div class="content">
        <div class="file-content-title">
          <div>驾驶证信息</div>
          <div class="file-explain">用于驾照查分</div>
          <div class="file-more">
            <div class="write-img" @click="goWrite(carFileDta)"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="file-from">
          <div>驾驶证号</div>
          <div class="file-more" :class="{'cr':carFileDta.driverNumber}">{{carFileDta.driverNumber || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>姓名</div>
          <div class="file-more" :class="{'cr':carFileDta.userName}">{{carFileDta.userName || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>初次领证日期</div>
          <div class="file-more" :class="{'cr':carFileDta.firstCard}">{{carFileDta.firstCard || '未填写'}}</div>
        </div>
        <div class="file-from">
          <div>档案编号</div>
          <div class="file-more" :class="{'cr':carFileDta.fileNumber}">{{carFileDta.fileNumber || '未填写'}}</div>
        </div>
      </div>
      <div class="file-rt"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CarFile',
  data () {
    return {
      carFileDta: '',
      isDone: true
    }
  },
  created () {
    this.getParams()
    console.log(this.$route.query.items)
  },
  methods: {
    goWrite (data) {
      console.log(data)
      this.$router.push({
        name: 'CarWriteInfo',
        query: {
          CarWriteData: data
        }
      })
    },
    getParams () {
      this.$store.commit('setCarParams', {
        paramsKey: 'setParams',
        carNo: this.$route.query.items
      })
      this.$store.dispatch('queryCarDetail')
        .then((data) => {
          console.log(data)
          this.carFileDta = data
          this.isDone = true
        })
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
  .content{
    flex: 1;
    background: #fff;
    padding: 5px 25px;
  }
  .file-from{
    height: 36px;
    line-height: 36px;
    color: rgb(141, 141, 141);
    font-size: 12px;
  }
  .cr{
    color: #5AC4F3;
  }
  .file-more{
    display: inline-block;
    vertical-align: middle;
    float: right;
  }
  .file-from div{
    display: inline-block;
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
  }
  .write-img{
    width: 16px;
    height: 16px;
    background-image: url(./../../assets/images/meal/file-write.png);
    background-size: 100%;
  }
</style>
