import Vue from 'vue'
import Router from 'vue-router'

import Cart from '@/components/Cart.vue'
import Home from '@/components/Home.vue'
import Receipts from '@/components/Receipts.vue'
import Search from '@/components/Search.vue'
import SearchResult from '@/components/SearchResult.vue'
import SearchItemsList from '@/components/SearchItemsList.vue'
import SearchQuickButtons from '@/components/SearchQuickButtons.vue'
import Orders from '@/components/Orders.vue'
import OrdersList from '@/components/OrdersList.vue'
import OrderEdit from '@/components/OrderEdit.vue'
import Service from '@/components/Service.vue'

Vue.use(Router)

const routes = [
  {  
    path: '/',
    name: 'home',
    component: Home
  },
  {  
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {  
    path: '/receipts/:date_range?',
    name: 'receipts',
    component: Receipts,
    props: true
  },
  {  
    path: '/search',
    component: Search,
    children: [
      {
        path: '',
        name: 'search',
        component: SearchQuickButtons
      },
      {
        path: 'substring/:substring',
        name: 'search-by-substring',
        component: SearchResult,
        props: true
      },
      {
        path: 'exact/brand_id/:brand_id/string/:string',
        name: 'search-items-list',
        component: SearchItemsList,
        props: true
      }
    ]
  },
  {
    path: '/orders',
    component: Orders,
    children: [
      {
        path: '',
        name: 'orders',
        component: OrdersList,
        props: { date_range: 'last_week'}
      },
      {
        path: 'date_range/:date_range',
        name: 'orders-date-range',
        component: OrdersList,
        props: true
      },
      {
        path: 'substring/:substring',
        name: 'orders-list-by-substring',
        component: OrdersList,
        props: true
      },
      {
        path: 'phone_number/:phone_number',
        name: 'orders-list-by-phone-number',
        component: OrdersList,
        props: true
      },
      {
        path: ':id',
        name: 'order-edit',
        component: OrderEdit,
        props: true
      }
    ]
  },
  {  
    path: '/service',
    name: 'service',
    component: Service
  }
]
const router = new Router({
  mode: 'history',
  routes
})

export default router
