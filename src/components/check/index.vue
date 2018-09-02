<template>
  <div class="check-bt" v-if="isDone">
    <div class="check-top">
      <img src="./../../assets/images/meal/check.png">
    </div>
    <div class="check-time"  v-for="(check, index) in checkInfo" :key="check.index">
      <div class="check-rt"></div>
      <div class="check-content">
        <div class="time">
          <div class="time-wd">{{check.orderNo}}</div>
        </div>
        <div class="content">
          <div>订单号: {{check.createTime}}</div>
          <div class="content-car">
            <div class="content-car-info">
              <img class="car-img" src="./../../assets/images/meal/my-personal-bmw.png">
            </div>
            <div class="car-info">
              <div class="car-text">{{check.carNo}}</div>
              <div><span>{{check.brandName}}</span><span>{{check.carTypenName}}</span></div>
            </div>
          </div>
          <div class="check-safa">
            <div>安全九项</div>
            <div class="mark-down">
              <img src="./../../assets/images/meal/check-mark.png">
              <div :class="check.show ? 'mark-up-img' : 'mark-down-img' " @click="showMore(index)"></div>
            </div>
          </div>
          <div class="line" v-show="check.show">
          </div>
          <div class="check-details"  v-show="check.show">
            <div class="check-every">
              <div class="subtitle">胎压检测</div>
              <div class="test-detail">
                <div>前左<span class="test-lt">{{check.tireBeforeLeft}}/cm²</span></div>
                <div class="rt">前右<span class="test-lt">{{check.tireBeforeRight}}/cm²</span></div>
              </div>
              <div class="test-detail">
                <div>后左<span class="test-lt">{{check.tireAfterLeft}}/cm²</span></div>
                <div class="rt">后右<span class="test-lt">{{check.tireAfterRight}}/cm²</span></div>
              </div>
              <div class="test-detail test-pre">充气至: {{check.inflatable}}/cm²</div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>轮胎花纹深度</span>
                <span class="rt">{{check.brakePieceStatus == '0' ? '正常':'故障'}}</span>
              </div>
              <div class="test-detail" style="">
                <div class="" style="margin-left: 36px;">
                  <span class="check-garden" :class="check.tireExterior != '1' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt" style="margin-right: 22px;">
                  <span class="check-garden" :class="check.tireExterior == '1' ? 'mark':'' "></span><span class="test-md">故障</span>
                </div>
              </div>
               <div class="remarks">备注:</div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>制动片</span>
                <span class="rt">{{check.brakePieceStatus == '0' ? '正常':'建议更换'}}</span>
              </div>
              <div class="test-detail" style="">
                <div class="">
                  <span class="test-md">前</span>
                  <span class="check-garden" :class="check.brakePieceStatus == '0' || check.brakePieceStatus == '2' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt">
                  <span class="check-garden" :class="check.brakePieceStatus == '0' || check.brakePieceStatus =='2' ? '':'mark' "></span><span class="test-md">建议更换</span>
                </div>
              </div>
              <div class="test-detail">
                <div>    <span class="test-md">后</span>
                  <span class="check-garden" :class="check.brakePieceStatus == '0' || check.brakePieceStatus == '3' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt">
                  <span class="check-garden" :class="check.brakePieceStatus == '0' || check.brakePieceStatus == '3' ? '':'mark' "></span><span class="test-md">建议更换</span>
                </div>
              </div>
              <div class="remarks">备注:</div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>灯光</span>
                <span class="rt">{{check.lightStatus == '1' ? '建议更换':'正常'}}</span>
              </div>
                <div class="test-detail" style="">
                <div class="" style="margin-left: 36px;">
                  <span class="check-garden" :class="check.lightStatus != '1' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt">
                  <span class="check-garden" :class="check.lightStatus == '1' ? 'mark':'' "></span><span class="test-md">建议更换</span>
                </div>
              </div>
              <div class="remarks">备注:</div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>雨刮片</span>
                <span class="rt">{{check.wiperBlade == '1' ? '建议更换':'正常'}}</span>
              </div>
                <div class="test-detail" style="">
                <div class="" style="margin-left: 36px;">
                  <span class="check-garden" :class="check.wiperBlade != '1' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt">
                  <span class="check-garden" :class="check.wiperBlade == '1' ? 'mark':'' "></span><span class="test-md">建议更换</span>
                </div>
              </div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>雨刮水</span>
                <span class="rt">{{check.rainWiperStatus != '1' ? '已加注':''}}</span>
              </div>
                <div class="test-detail" style="">
                <div class="" style="margin-left: 36px;">
                  <span class="check-garden" :class="check.rainWiperStatus != '1' ? 'adopt':'' "></span><span class="test-md">已加注</span>
                </div>
              </div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>冷却液</span>
                <span class="rt">{{check.coolingFluidStatus == '1' ? '建议更换':'正常'}}</span>
              </div>
                <div class="test-detail" style="">
                <div class="" style="margin-left: 36px;">
                  <span class="check-garden" :class="check.coolingFluidStatus != '1' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt">
                  <span class="check-garden" :class="check.coolingFluidStatus == '1' ? 'mark':'' "></span><span class="test-md">建议更换</span>
                </div>
              </div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>外观/漆面</span>
                <span class="rt">{{check.appearanceStatus == '1' ? '建议更换':'正常'}}</span>
              </div>
                <div class="test-detail" style="">
                <div class="" style="margin-left: 36px;">
                  <span class="check-garden" :class="check.appearanceStatus != '1' ? 'adopt':'' "></span><span class="test-md">正常</span>
                </div>
                <div class="rt">
                  <span class="check-garden" :class="check.appearanceStatus == '1' ? 'mark':'' "></span><span class="test-md">建议更换</span>
                </div>
              </div>
            </div>
            <div class="check-every">
              <div class="subtitle">
                <span>启动电压</span>
                <span class="rt">{{check.voltage}}V</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="check-rt"></div>
    </div>
    <!-- 底部导航栏 -->
    <HomeFooter :fromPage="'quality'"/>
  </div>
</template>

<script>
import HomeFooter from '../home/home-footer'
// import { mapGetters } from 'vuex'

export default {
  name: 'Check',
  components: {
    HomeFooter
  },
  data () {
    return {
      checkInfo: [
      //   {
      //     orderNo: '5月4日',
      //     carNo: '粤B156E1',
      //     brandName: '宝马5系（进口）',
      //     voltage: '36v',
      //     carTypenName: '2015款5251',
      //     createTime: '5月2日',
      //     show: false
      //   },
      //   {
      //     orderNo: '5月4日',
      //     carNo: '粤B156E1',
      //     brandName: '宝马5系（进口）',
      //     voltage: '',
      //     carTypenName: '2015款5251',
      //     createTime: '5月4日',
      //     show: false
      //   }
      ],
      // show: -1,
      isDone: false
    }
  },
  created () {
    this.queryCheckData()
  },
  methods: {
    queryCheckData () {
      this.$store.commit('setCheckParams', {
        paramsKey: 'setCheckParams'
      })
      this.$store.dispatch('queryCheckData')
        .then((data) => {
          // data.qualityList.forEach((item) => {
          //   item.show = false
          //   item.brandName = '宝马5系（进口）'
          // })
          // console.log(data.qualityList)
          this.checkInfo = data.qualityList
          this.isDone = true
        })
    },
    showMore (index) {
      console.log(index)
      this.checkInfo[index].show = !this.checkInfo[index].show
      console.log(this.checkInfo[index].show)
      // for (let i = 0; i < this.checkInfo.length; i++) {
      //   if (this.checkInfo[i] !== this.checkInfo[index]) {
      //     this.checkInfo[i].show = false
      //   }
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.check-top{
  padding: 10px;
  background: #fff;
}
.check-top img{
  width: 100%;
}
.check-time{
  display: flex;
  margin-top: 10px;
  width: 100%;
  color: #929292;
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
  width: 90px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  background: #C6C6C6;
  color: #F1F1F1;
  margin: auto;
}
.content{
  background: #fff;
  padding: 14px 20px;
  font-size: 12px;
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
  margin: 25px 0px;
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
  margin-top: 15px;
  margin-bottom: 8px;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
  background-size: 6px 1px;
  background-repeat: repeat-x;
}
.check-details{
  /*padding: 15px;*/
}
.subtitle{
  height: 25px;
  line-height: 25px;
  background: #F0F0F0;
  color: #797979;
  padding: 0px 15px;
}
.test-detail {
  margin-left: 24px;
  margin-top: 10px;
  margin-right: 24px;
}
.test-detail div{
  display: inline-block;
}
.check-every{
  margin-bottom: 10px;
}
.rt{
  float: right;
}
.test-pre{
  color: #5AC4F3;
  margin-top: 19px;
}
.test-lt{
  margin-left: 20px;
}
.check-garden{
  display: inline-block;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 1px solid #7D7D7D;
}
.test-md{
  vertical-align: top;
  padding-top: 5px;
  padding-left: 9px;
  margin-right: 13px;
}
.remarks{
  margin: 9px 0px 0px 40px;
}
.adopt{
  background-image: url('./../../assets/images/meal/check-cancel.png');
  background-size: 100% 100%;
  border: none;
  width: 19px;
  height: 19px;
}
.mark{
  background-image: url('./../../assets/images/meal/check-mark.png');
  background-size: 100% 100%;
  border: none;
  width: 19px;
  height: 19px;
}
.rn{
  display: none;
}
.check-bt{
  margin-bottom: 80px;
}
</style>
