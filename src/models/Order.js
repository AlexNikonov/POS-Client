import OrderItem from '@/models/OrderItem'

export default function (args) {
  this.id = args.id
  this.updated_at = args.updated_at
  this.client = args.client
  this.user = args.user.name
  this.status = args.order_status.name
  
  this.phone_code = args.phone_code
  this.phone = args.phone
  this.phone_operator_code = args.phone_operator_code
  this.comment = args.comment
  this.products = []
  this.total = args.order_products.reduce(
    (total, item) => {
      this.products.push( new OrderItem(item) )
      return total + item.price_discount * item.quantity
    }, 0
  )
  return Object.freeze(this)
}
