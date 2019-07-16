import Product from '@/models/Product'

export default class OrderItem extends Product {
  constructor (item) {
    super(item)
    this.line_id = item.line_id || 0
    this.customer_code = item.customer.code || ''
    this.status = item.order_product_status.name || ''
  }
}