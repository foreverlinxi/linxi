import Order from '@/components/order'
import OrderAssess from '@/components/order/order-assess'
import OrderIndex from '@/components/order/order-index'
import OrderStatus from '@/components/order/order-status'

export default {
  path: '/order',
  name: 'Order',
  component: Order,
  children: [
    {
      path: 'assess',
      name: 'OrderAssess',
      component: OrderAssess
    },
    {
      path: 'info',
      name: 'OrderIndex',
      component: OrderIndex
    },
    {
      path: 'status',
      name: 'OrderStatus',
      component: OrderStatus
    }
  ]
}
