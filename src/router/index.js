import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import login from './login'
import LocationIndex from '@/components/location'
import service from './service'
import order from './order'
import car from './car'
import Check from '@/components/check'
// xiong
import UserCenter from '@/components/userCenter'
import Rechargeable from '@/components/rechargeable'
import RechCard from '@/components/rechCard'
import Coupon from '@/components/coupon'
import GetCoupon from '@/components/getCoupon'
import CardPack from '@/components/cardPackage'
import DetaillList from '@/components/detaillList'
import CardPackRech from '@/components/cardPackRech'

import New from '@/components/news'
import Address from '@/components/address'
import AddressList from '@/components/address/adress-list'
import CarAdd from '@/components/carAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/location',
      name: 'Location',
      component: LocationIndex
    },
    login,
    service,
    order,
    car,
    {
      path: '/check',
      name: 'Check',
      component: Check
    },
    { // xiong
      path: '/Center',
      name: 'Center',
      component: UserCenter
    },
    {
      path: '/Rech',
      name: 'Rech',
      component: Rechargeable
    },
    {
      path: '/RechCard',
      name: 'RechCard',
      component: RechCard
    },
    {
      path: '/Coupon',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/GetCoupon',
      name: 'GetCoupon',
      component: GetCoupon
    },
    {
      path: '/CardPack',
      name: 'CardPack',
      component: CardPack
    },
    {
      path: '/CardPackRech',
      name: 'CardPackRech',
      component: CardPackRech
    },
    {
      path: '/DetaillList',
      name: 'DetaillList',
      component: DetaillList
    },
    {
      path: '/news',
      name: 'New',
      component: New
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      children: [
        {
          path: 'adInfo',
          name: 'AddressList',
          component: AddressList
        }
      ]
    },
    {
      path: '/carAdd',
      name: 'CarAdd',
      component: CarAdd
    }
  ]
})
