<template>
  <div v-if='isDone'>
  <div class="add-car">
    <div class="add-hg">
      <div style="margin-left: 10px;" class="carName">{{car || '选择品牌/型号'}}</div>
      <div style="flex:1;"></div>
      <div class="item-content-more" @click="goChooseCar">
        <img class="item-content-more" src="./../../assets/images/personal/personal-right.png">
      </div>
    </div>
    <div class="add-hg">
      <div class="add-car-color" style="margin-left: 10px;">车牌号</div>
      <div class="add-car-name" @click="jsKeyBoard"><input type="" name="" placeholder="" :id="carTitle" maxlength="1" disabled="disabled" :value="clickKey"></div>
      <div class="add-car-write" @click="jsKeyNumber">
        <input type="" name="" placeholder="请输入车牌号" :id="carNumber" disabled="disabled" :value="carText" maxlength="8">
      </div>
    </div>
    <div class="add-sub" @click="submitAdd">保存</div>
    <div class="keyBoard" v-if="showKey">
    <ul>
      <li v-for="keyWord in provinces" :key="keyWord" @click="clickKeyWord(keyWord)">{{keyWord}}</li>
    </ul>
    </div>
    <div class="keyNumber" v-if="showNumber">
      <ul>
        <li class="words" v-for="word in numWord" :key="word" @click="clickKeyNumber(word)">{{word}}</li>
        <li v-for="(keyNumber, index) in keyNums" :key="index" @click="clickKeyNumber(keyNumber)" class="number">{{keyNumber}}</li>
        <li class="remove" @click='clickRemove'>
          <img src="./../../assets/images/meal/cencel.png" alt="" class="cencel">
        </li>
        <li class="number" v-for="lett in letter" :key="lett" @click="clickKeyNumber(lett)">{{lett}}</li>
        <li class="finish" @click='clickFinish'>完成</li>
      </ul>
    </div>
  </div>
  <div class="car-choose-info" v-if="showChooseCar">
 <!--    <div class="choose-title" style="width: 80%;float:right;">
      <img src="./../../assets/images/meal/car-right.png" alt="" @click="back"><li class="remove" @click='clickRemove'>
          <img src="./../../assets/images/meal/cencel.png" alt="" class="cencel">
        </li>
      请选择品牌
    </div> -->
    <div v-if="showHot">
      <div class="choose car-brand">
      <div class="choose-title-brand" style="">
      <!-- <img src="./../../assets/images/meal/car-right.png" alt="" @click="back"> -->
      请选择品牌
      <span class="ft-cancel" @click="cancel()">取消</span>
      <!-- <div class="search">
        <img src="./../../assets/images/meal/car-right.png" alt="">
        <input type="text" placeholder="搜索">
      </div> -->
    </div>
    <div class="hot-car">
      <div class="hot-brand">热门品牌</div>
      <div class="line"></div>
      <ul class="hot-brand-list">
        <li v-for="(hotItem, index) in hotList" :key="index" @click="openCarAudi(hotItem)">
          <img :src="imgbaseulr + hotItem.logo" alt="">
          <div>{{hotItem.brandName}}</div>
        </li>
      </ul>
    </div>
    <ul v-for="(itemList, index) in pinYinBlockList" :key="index">
        <h1 class="choose-id" :id="itemList[0][0].pinyin">{{itemList[0][0].pinyin}}</h1>
        <div v-for="(itemListChild, index) in itemList" :key="index">
        <li v-for="(items, index) in itemListChild" :key="index" v-if="items.brandName" @click="openCarAudi(items)">
          <div class="car-name">
            <img :src="imgbaseulr + items.logo" alt="">
            <span>{{items.brandName}}</span>
          </div>
        </li>
        </div>
    </ul>
    </div>
    </div>
    <aside class="car-audi" v-if="closeAudi" @click="carSysClose">
      <div class="content">
        <div class="choose-title">
        <img src="./../../assets/images/meal/car-right.png" alt="" @click="carSysClose">
        请选择车系
        </div>
        <div class="choose">
        <ul>
          <li v-for="serItem in seriesListChild" :key="serItem.index" @click="openCarType(serItem)">
            <div class="car-name">
              <span>{{serItem.carSeries}}</span>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </aside>
    <aside class="car-type" @click="carCloseType" v-if="closeType">
      <div class="content">
        <div class="choose-title">
        <img src="./../../assets/images/meal/car-right.png" alt="" @click="carCloseType">
        请选择车型
        </div>
        <div class="choose">
        <ul>
          <li v-for="modelItem in modelList" :key="modelItem.index" @click="chooseCarInfo(modelItem)" v-if="modelItem.seriesName">
            <div class="car-name">
              <span>{{modelItem.seriesName}}</span>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </aside>
    <div class="car-pingYin">
      <ul v-for="(itemList, index) in pinYinList" :key="index" >
        <li v-for="(items, index) in itemList" :key="index" @click="goAnchor(items[0].pinyin)">{{JSON.stringify(items) !== '{}' ? items[0].pinyin : 'null'}}</li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import utils from '@/common/utils'
import { IMGBASEURL } from '../../store/url'

export default {
  name: 'CarAdd',
  data () {
    return {
      items: [
        {number: '粤B156E1'},
        {}
      ],
      isDone: true,
      car: '',
      imgbaseulr: IMGBASEURL,
      carTitle: 'carTitle',
      carNumber: 'carNumber',
      showCity: true,
      closeAudi: false,
      closeType: false,
      hotList: [],
      brandList: [],
      seriesList: [],
      seriesListChild: [],
      modelList: [],
      pinYinBlockList: [],
      pinYinList: [],
      showChooseCar: false,
      showHot: false,
      showKey: false,
      showNumber: false,
      clickKey: '',
      inputText: [],
      carText: '',
      useChoose: {
        brandName: '',
        carSeries: '',
        seriesName: '',
        carInfo: {}
      },
      /* eslint-disable */
      provinces: ['京','沪',"浙","苏","粤","鲁","晋","冀","豫","川","渝","辽","吉","黑","皖","鄂","津","贵","云","桂","琼","青","新","藏", "蒙","宁","甘","陕","闽","赣","湘"],
      keyNums:["0","1","2","3","4","5","6","7","8","9","Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L"],
      numWord:['京','沪',"浙","苏","粤"],
      letter: ["Z","X","C","V","B","N","M"]
    }
  },
  created () {
    this.queryCtiy()
    this.rankNmber()
    // this.isDone = true
  },
  methods: {
    goWrite () {
      this.$router.push({
        name: 'CarFile'
      })
    },
    remove (index) {
      this.items.splice(index, 1)
    },
    rankNmber () {
    },
    cancel () {
      this.showChooseCar = false
    },
    goChooseCar () {
      this.showChooseCar = true
      this.showHot = true
    },
    jsKeyBoard () {
      this.showKey = true
      this.showNumber = false
    },
    clickFinish() {
      this.showNumber = false
    },
    clickKeyWord (keyWord) {
      this.clickKey = keyWord
      this.showKey = false
    },
    jsKeyNumber () {
      this.showNumber = true
      this.showKey = false
    },
    submitAdd () {
      let carTitleValue = document.getElementById('carTitle').value
      let carNumberValue = document.getElementById('carNumber').value
      let str = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
      if ((!this.car) || (!carTitleValue) || (!carNumberValue)) {
        this.$tip.show({
          message: '所有信息需填写完整'
        })
        return
      }
      if (!str.test(carTitleValue + carNumberValue)) {
        this.$tip.show({
          message: '请输入正确的车牌号'
        })
        return
      }
      console.log(this.useChoose)
      this.$store.commit('setCarParams', {
        paramsKey: 'carAddParams',
        carNo: carTitleValue + carNumberValue,
        carId: this.useChoose.carInfo.carId,
        carNum: this.useChoose.carInfo.carNum,
        seriesId: this.useChoose.carInfo.seriesId,
        modelId: this.useChoose.carInfo.modelId,
        imgUrl: this.useChoose.carInfo.logo
      })
      this.$store.dispatch('addCar')
        .then((data) => {
          this.$router.push({
            name: 'CarCheck'
          })
        })
    },
    queryCtiy () {
      // 查询品牌车辆
      this.$store.dispatch('queryCarBrand')
        .then((data) => {
          console.log(data)
          this.brandList = data.brandList
          this.seriesList = data.seriesList
          this.hotList = data.hotList
          let arr = this.brandList
          let len = arr.length - 1
          for (var i = len; i >= 0; i--) {
            if (!arr[i].pinyin) {
              arr.splice(i, 1)
            }
          }
          this.cityDataFormat(arr, 'pinyin')
          // this.isDone = true
        })
    },
    // 选择城市的id，入参查询小区
    changeSelectCity (objParams) {
      // 设置城市小区
      this.setCityVillage()
    },
    // 城市数据格式化
    cityDataFormat (list, key) {
      // 将数组按照pinYin属性排序
      let listSort = list.sort(this.compare(key))
      // 同属于一个字母下面的元素分组
      let allList = []
      let listChild = []
      listSort.forEach((item) => {
        if (JSON.stringify(listChild) === '[]') {
          listChild.push(item)
        } else if (listChild[listChild.length - 1].pinyin === item.pinyin) {
          listChild.push(item)
        } else if (listChild[listChild.length - 1].pinyin !== item.pinyin) {
          allList.push(listChild)
          listChild = []
          listChild.push(item)
        }
      })
      allList.push(listChild)
      let arr = []
      allList.forEach((item) => {
        arr.push(this.addNullObj(item, 3))
      })
      this.pinYinBlockList = arr
      this.pinYinList = this.addNullObj(allList, 8)
    },
    // 关闭弹窗选择车
    carSysClose () {
      this.closeAudi = false
      this.showHot = true
    },
    // 关闭弹窗选择车型
    carCloseType () {
      this.closeType = false
      this.showHot = true
    },
    openCarAudi (items) {
      console.log(items)
      this.useChoose.brandName = items.brandName
      let seriesListData = this.seriesList
      let len = seriesListData.length
      let arr = []
      for (var i = 0; i < len; i++) {
        if (seriesListData[i].carId === items.carId) {
          arr.push(seriesListData[i])
        }
      }
      this.seriesListChild = arr
      this.closeAudi = true
      this.showHot = false
    },
    openCarType (seriesItem) {
      console.log(seriesItem)
      this.useChoose.carSeries = seriesItem.carSeries
      this.$store.commit('setCarParams', {
        paramsKey: 'carModerParams',
        seriesId: seriesItem.seriesId
      })
      this.$store.dispatch('queryCarModer')
        .then((data) => {
          this.modelList = data.modelList
          this.closeType = true
        })
    },
    chooseCarInfo (modelItems) {
      console.log(modelItems)
      console.log(this.useChoose)
      this.useChoose.seriesName = modelItems.seriesName
      this.useChoose.carInfo = modelItems
      this.car = this.useChoose.brandName + ' ' + this.useChoose.carSeries + ' ' + this.useChoose.seriesName
      this.closeType = false
      this.closeAudi = false
      this.showChooseCar = false
    },
    // 添加空对象
    addNullObj (list, num) {
      let arr = utils.incisionArray(list, num)
      let arrLastItem = arr[arr.length - 1]
      let arrLastItemLength = arrLastItem.length
      if (arrLastItemLength < num) {
        for (let j = num; j > arrLastItemLength; j--) {
          arrLastItem.push({})
        }
      }
      return arr
    },
    // 比较规整，按照pinYin属性的字母排序
    compare (property) {
      return function (a, b) {
        let val1 = a[property]
        let val2 = b[property]
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    },
    // 锚点定位
    goAnchor (selector) {
      let anchor = this.$el.querySelector('#' + selector)
      document.body.scrollTop = anchor.offsetTop
    },
    clickKeyNumber (number) {
      console.log(number)
      this.inputText.push(number)
      console.log(this.inputText)
      this.carText = this.inputText.join('')
    },
    clickRemove () {
      if (this.inputText.length >=0) {
        this.inputText.pop()
      } 
      this.carText = this.inputText.join('')   
    }
  }
}
</script>
<style scoped="">
.add-car{
  width: 100%;
  height: 100%;
  background: #fff;
}
.carName{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.add-hg{
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  font-size: 14px;
  color: rgb(141, 141, 141);
  border-bottom: 1px solid rgb(225, 225, 225);
}
.item-content-more {
  display: inline-block;
  vertical-align: middle;
  float: right;
  margin-right: 10px;
}
.item-content-more>img {
  width: 6.5px;
  height: 12.5px;
}
.add-car-color{
  color: rgb(95, 197, 241);
  margin-right: 10px;
}
.add-car-name{
  width: 40px;
  height: 40px;
  line-height: 40px;
  background: rgb(236, 250, 255);
  text-align: center;
  margin-right: 10px;
}
.add-car-write{
  flex: 1;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  background: rgb(236, 250, 255)
}
input{
  width: 100%;
  font-size: 10px;
  text-align: center;
  background: rgb(236, 250, 255);
}
.add-sub{
  width: 90%;
  text-align: center;
  margin: auto;
  margin-top: 50px;
  height: 44px;
  line-height: 44px;
  border-radius: 5px;
  color: #fff;
  background: rgb(95, 197, 241);
}
.location-pinyin-item {
  height: 28px;
  width: 100%;
  background: #fff;
  margin-top: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #8d8d8d;
  border: 1px solid #5ac4f3;
}
.location-pinyin-null {
  height: 28px;
  width: 100%;
  margin-top: 15px;
}
.pinYin-block-middle {
  flex: 1;
  display: flex;
  margin-right: -18px;
  flex-direction: column;
}
.pinYin-block-ul {
  margin-top: 15px;
}
.pinYin-block-li {
  list-style:none;
}
.pinYin-block-middle-ul {
  display: flex;
  width: 100%;
}
.choose-id{
  width: 100%;
  background: #F0F0F0;
}
.choose-title{
    border-bottom: 1px solid #E4E7E8;
    text-align: center;
    font-size: .3rem;
    height: 30px;
    line-height: 30px;
    width: 100%;
    top: 0;
    background: #fff;
}
.choose-title>img {
    float: left;
    width: 22px;
    height: 22px;
    margin-top: 4px;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
}
.choose-title-brand{
    border-bottom: 1px solid #E4E7E8;
    text-align: center;
    font-size: 1rem;
    /*height: 90px;*/
    padding-bottom: 10px;
    width: 100%;
    padding-top: 10px;
    top: 0;
    background: #EFEFEF;
    margin-right: 5%;
}
.car-name{
    height: 40px;
    line-height: 40px;
    font-size: .3rem;
    padding-left: 10px;
    color: #4e5165;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #fff;
}
.car-name img{
    width: 24px;
    height: 24px;
    margin-right: 9px;
    vertical-align: middle;
}
ul h1{
  padding-left: 10px;
}
li{
  border-bottom: 1px solid #F5F5F5;
}
.car-audi,.car-type{
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: fixed;
    font-size: .24rem;
    left: 0;
}
.content{
    overflow: auto;
    background: #ffffff;
    z-index: 23333333333;
    position: absolute;
    right: 0;
    width: 80%;
    height: 100%;
}
.car-pingYin{
    color: #767676;
    font-size: .3rem;
    position: fixed;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    right: 5px;
    top: 1rem;
    bottom: 0;
    width: .8rem;
    z-index: 49;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    padding: 0;
}
.car-pingYin li{
  list-style:none;
  height: 20px;
  line-height: 20px;
  width: 30px;
  font-size: 14px;
  text-align: center;
}
.car-choose-info{
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: fixed;
    font-size: .24rem;
}
.car-brand{
  width: 80%;
  height: 100%;
  position: absolute;
  right: 0;
  overflow: auto;
}
li{
  list-style:none;
}
.search{
  width: 94%;
  height: 32px;
  background: #fff;
  margin-left: 10px;
  line-height: 32px;
  text-align: left;
  margin-top: 10px;
  border-radius: 5px;
}
.ft-cancel{
  float: right;
  margin-right: 12px;
  color: #008DF9
}
.search>img{
  width: 17px;
  height: 17px;
}
.search> input {
  width: 80%;
  height: 17px;
  line-height: 17px;
  text-align:left;
  background: #fff;
  margin-left: 10px;
}
.hot-car{
  background: #fff;
}
.line{
  height: 1px;
  width: 100%;
  background: #DBDBDB;
}
.hot-brand{
  margin-left: 18px;
  padding-top: 9px;
  padding-bottom: 9px;
}
.hot-brand-list{
  padding-bottom: 18px;
  padding-left: 5px;
}
.hot-brand-list li>img{
  width: 24px;
  height: 24px;
}
.hot-brand-list li {
  width: 17%;
  display: inline-block;
  text-align: center;
  border-bottom: 0px;
  margin-top: 17px;
}
.keyBoard,.keyNumber{
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #CED3D9;
}
.keyBoard ul,.keyNumber ul {
  padding-bottom: 9px;
}
.keyBoard ul li{
  width: 14%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  background: #fff;
  margin-left: 9px;
  margin-top: 9px;
  border-radius: 5px;
}
.keyNumber .number {
  width: 8%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  background: #fff;
  margin-left: 7px;
  margin-top: 9px;
  border-radius: 5px;
}
.finish {
  width: 70px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  background: #fff;
  margin-left: 7px;
  margin-top: 9px;
  border-radius: 5px;
}
.fr{
  margin-left: 30px;
}
.words{
  width: 16%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  background: #fff;
  margin-left: 12px;
  margin-top: 9px;
  border-radius: 5px;
}
.remove{
  width: 8%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
  background: #fff;
  margin-left: 2px;
  margin-top: 9px;
  border-radius: 5px;
}
.cencel{
  display: inline-block;
  width: 20px;
  height: 17px;
  vertical-align: middle;
}
</style>
