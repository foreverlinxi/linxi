import Service from '@/components/service'
import ServiceList from '@/components/service/service-list'
import ServiceOrderIndex from '@/components/service/service-order-index'
import ServiceSuccess from '@/components/service/service-success'

export default {
  path: '/service',
  name: 'Service',
  component: Service,
  children: [
    {
      path: 'list',
      name: 'ServiceList',
      component: ServiceList
    },
    {
      path: 'order',
      name: 'ServiceOrderIndex',
      component: ServiceOrderIndex,
      meta: {
        keepAlive: true
      }
    },
    {
      path: 'suc',
      name: 'ServiceSuccess',
      component: ServiceSuccess
    }
  ]
}
