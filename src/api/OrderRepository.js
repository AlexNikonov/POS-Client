import api from './index'
import Order from '@/models/Order'

const resource = '/orders'

const get_resource = async url => {
  try {
    const response = await api.get(url)
    return response.data.list.map(item => new Order(item))
  } catch (err) {
    throw new Error("Can't get orders! Error: " + err.message)
  }
}

export default {
  getListByDateRange (value) {
    return get_resource(`${ resource }/date_range/${ value }`)
  },
  getListBySubstring(value) {
    return get_resource(`${ resource }/substring/${ value }`)
  },
  getListByPhoneNumber(value) {
    return get_resource(`${ resource }/phone_number/${ value }`)
  },
  getOrder(id) {
    return get_resource(`${ resource }/${ id }`)
  }
}

export const show_orders_mode = Object.freeze({
  SHOW_BY_DATE_RANGE: 'show_by_date_range',
  SEARCH_BY_SUBSTRING: 'search_by_substring',
  SEARCH_BY_PHONE_NUMBER: 'search_by_phone_number'  
})