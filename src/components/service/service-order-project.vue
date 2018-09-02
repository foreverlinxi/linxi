<template>
  <div class="service-order-project" v-if="isDone">
    <div class="title">
      <span>选择服务项目</span>
      <span v-if="canMultiSelect">(可多选)</span>
    </div>
    <div class="item-list">
      <div class="left"></div>
      <div class="content">
        <ul style="display: flex;" v-for="itemList in projectList" :key="itemList.index">
          <li style="list-style:none;flex: 1;" v-for="items in itemList" :key="items.index">
            <ServiceOrderProjectItem :itemObj="items" :selectProject="selectProject"/>
          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceOrderProjectItem from './service-order-project-item'
import utils from '@/common/utils'
// 操作localstorage的库
import Lockr from 'lockr'

export default {
  name: 'ServiceOrderProject',
  data () {
    return {
      isDone: false,
      projectList: []
    }
  },
  props: ['setPayAndDate', 'setAppointmentTime', 'countDinnerCut', 'setCouponButton'],
  components: {
    ServiceOrderProjectItem
  },
  computed: {
    ...mapGetters({
      getWashBeauty: 'getWashBeauty'
    }),
    // 除了洗车1单选，其他都是多选
    canMultiSelect () {
      return this.$route.query.type !== '1'
    }
  },
  watch: {
    getWashBeauty (newVal, oldVal) {
      if (newVal.serverList[0].goodsId !== oldVal.serverList[0].goodsId) {
        this.contactServiceList()
      }
    }
  },
  created () {
    this.contactServiceList()
  },
  methods: {
    // 完善数组添加active和修改数据结构
    contactServiceList () {
      let serverList = this.getWashBeauty.serverList
      serverList.forEach((item, index) => {
        // 默认第一个选中
        if (index === 0) {
          item.isActive = true
          this.setPayAndDate(item.goodsMoney, item.goodsDate)
          // 计算套餐卡抵扣
          this.countDinnerCut([item])
        } else {
          item.isActive = false
        }
      })
      let arr = utils.incisionArray(serverList, 3)
      // 长度大于2 需要用空白补全，才能三个并列，只有两个的时候平分左右。
      if (serverList.length > 2) {
        let arrLastItem = arr[arr.length - 1]
        let arrLastItemLength = arrLastItem.length
        if (arrLastItemLength < 3) {
          for (let j = 3; j > arrLastItemLength; j--) {
            arrLastItem.push({})
          }
        }
      }
      this.projectList = arr
      this.isDone = true
    },
    // 选择服务项目
    selectProject (itemTitle) {
      let self = this
      // 选择项目之后，需要重置取车时间
      this.setAppointmentTime('')
      // 选择项目之后，删掉之前保留的优惠券本地数据
      Lockr.rm('activeCoupon')
      this.setCouponButton('N', 0)
      // 可多选
      if (this.canMultiSelect) {
        this.projectList.forEach((itemList) => {
          itemList.forEach((item, index) => {
            // 多选情况下，点那个哪个选中，再点反选
            if (item.goodsName === itemTitle) {
              self.$set(itemList, index, {
                isActive: !item.isActive,
                goodsName: item.goodsName,
                goodsMoney: item.goodsMoney,
                goodsDate: item.goodsDate,
                goodsId: item.goodsId
              })
              // 实时计算价格总和
              this.getAllPay()
            }
          })
        })
      } else { // 不可多选
        this.projectList.forEach((itemList) => {
          itemList.forEach((item, index) => {
            // 设置选中效果
            if (item.goodsName === itemTitle) {
              self.$set(itemList, index, {
                isActive: true,
                goodsName: item.goodsName,
                goodsMoney: item.goodsMoney,
                goodsDate: item.goodsDate,
                goodsId: item.goodsId
              })
              // 设置单位价格和服务时间
              self.setPayAndDate(item.goodsMoney, item.goodsDate)
              // 计算套餐卡抵扣
              this.countDinnerCut([item])
            } else {
              self.$set(itemList, index, {
                isActive: false,
                goodsName: item.goodsName,
                goodsMoney: item.goodsMoney,
                goodsDate: item.goodsDate,
                goodsId: item.goodsId
              })
            }
          })
        })
      }
    },
    // 计算所有价格总和，仅多选情况下使用
    getAllPay () {
      let allPrice = 0
      let allTime = 0
      //
      let activeItemList = []
      this.projectList.forEach((itemList) => {
        itemList.forEach((item, index) => {
          if (item.isActive) {
            allPrice += Number(item.goodsMoney)
            allTime += Number(item.goodsDate)
            activeItemList.push(item)
          }
        })
      })
      this.setPayAndDate(allPrice, allTime)
      // 计算套餐卡抵扣
      this.countDinnerCut(activeItemList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.service-order-project {
  background: #fff;
}
.left, .right {
  width: 10px;
}
.title {
  margin-left: 25px;
  line-height: 30px;
  display: inline-block;
  font-size: 12px;
  color: #6f6f6f;
  height: 30px;
}
.item-list {
  display: flex;
}
.content {
  flex: 1;
  margin-right: -10px;
}
</style>
