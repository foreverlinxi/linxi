import CarInfo from '@/components/car'
import CarCheck from '@/components/car/car-check'
import CarFile from '@/components/car/car-file'
import CarWriteInfo from '@/components/car/car-write-info'
// import CarAdd from '@/components/car/car-add'
// import CarChoose from '@/components/car/car-choose'

export default {
  path: '/car',
  name: 'CarInfo',
  component: CarInfo,
  children: [
    {
      path: 'check',
      name: 'CarCheck',
      component: CarCheck
    },
    {
      path: 'file',
      name: 'CarFile',
      component: CarFile
    },
    {
      path: 'write',
      name: 'CarWriteInfo',
      component: CarWriteInfo
    }
    // {
    //   path: 'add',
    //   name: 'CarAdd',
    //   component: CarAdd
    // },
    // {
    //   path: 'choose',
    //   name: 'CarChoose',
    //   component: CarChoose
    // }
  ]
}
