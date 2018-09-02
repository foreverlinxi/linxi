<template>
  <div v-if="isDone">
    <div class="car-title"></div>
    <div class="car-info" v-for="(item, index) in items" :key="item.index">
      <div class="car-rt"></div>
      <div class="car-detailed">
        <div class="car-ht" @click="chooseCar(item)">
          <div class="car-bwm">
            <img class="" :src="imgbaseulr + item.logo">
          </div>
          <div class="car-bwm-info">
            <div>{{item.carNo}}</div>
            <div class="car-cor">{{item.seriesName}}</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="car-write">
          <img src="./../../assets/images/meal/my-personal-remove.png" @click="remove(item, index)">
          <img @click='goWrite(item.carNo)' src="./../../assets/images/meal/my-personal-write.png">
        </div>
      </div>
      <div class="car-rt"></div>
    </div>
    <div class="order-submit" @click="carAdd">添加车辆</div>
  </div>
</template>
<script>
import CarFile from './car-file'
import Lockr from 'lockr'
import { IMGBASEURL } from '../../store/url'
export default {
  name: 'CarCheck',
  components: {
    CarFile
  },
  data () {
    return {
      items: [
        // {number: '粤B156E1', carTypeName: '宝马5系（进口）', carBrandName: '2015款5351'},
        // {number: '山B156E1', carTypeName: '宝马5系（进口）', carBrandName: '2015款5351'},
        // {number: '京A12345', carTypeName: '宝马5系（进口）', carBrandName: '2015款5351'}
      ],
      isDone: false,
      imgbaseulr: IMGBASEURL
    }
  },
  created () {
    this.getCarInfo()
  },
  methods: {
    goWrite (item) {
      // this.eventBus.$emit('chooseItem', item)
      console.log(item)
      this.$router.push({
        name: 'CarFile',
        query: {
          items: item
        }
      })
    },
    getCarInfo () {
      this.$store.commit('setCarParams', {
        paramsKey: 'setCarParams',
        phoneId: '13530869699'
      })
      this.$store.dispatch('queryCarData')
        .then((data) => {
          this.items = data.carList
          this.isDone = true
        })
    },
    remove (item, index) {
      this.$store.commit('setCarParams', {
        paramsKey: 'deleteCarParams',
        carUserId: item.carUserId
      })
      this.$store.dispatch('deleteCar')
        .then((data) => {
          this.items.splice(index, 1)
        })
    },
    carAdd () {
      this.$router.push({
        name: 'CarAdd'
      })
    },
    chooseCar (item) {
      if (this.$route.query.fromPage === 'service') {
        // 把选中的车辆数据存在本地
        Lockr.set('acitveCar', item)
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style scoped="">
  .car-title{
    width: 100%;
    height: 10px;
  }
  .car-info{
    display: flex;
    margin-bottom: 10px;
  }
  .car-rt{
    width: 10px;
  }
  .car-cor{
    font-size: 12px;
    color: #949494;
  }
  .car-ht{
    padding: 15px 10px 0px;
    height: 60px;
    display: flex;
  }
  .car-bwm img{
    width: 20px;
    height: 20px;
    margin-right: 9px;
    margin-top: 1px;
  }
  .car-detailed{
    flex: 1;
    background: #fff;
    height: 120px;
  }
  .car-bwm-info{
    display: inline-block;
  }
  .line{
    height: 1px;
    background: #f0f0f0;
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
  .car-write img{
    width: 25px;
    height: 25px;
    vertical-align: middle;
    float: right;
    margin-right: 22px;
    margin-top: 10px;
  }
</style>
