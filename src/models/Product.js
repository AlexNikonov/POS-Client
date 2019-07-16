export default class Product { 
  constructor ({ order_product_brand = '',
                 number = '',
                 spec_name = '',
                 quantity = 0,
                 price_base = 0,
                 discount = 0,
                 price_discount = 0 } = {}) {
    this.brand = order_product_brand.name
    this.number = number
    this.spec_name = spec_name
    this.quantity = quantity
    this.price_base = price_base
    this.discount = discount
    this.price_discount = price_discount
  }
}