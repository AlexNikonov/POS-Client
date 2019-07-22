export default class Product { 
  constructor ({ brand = '',
                 number = '',
                 spec_name = '',
                 quantity = 0,
                 price_base = 0,
                 discount = 0,
                 price_discount = 0 } = {}) {
    this.brand = typeof brand === 'object' ? brand.name : brand
    this.number = number
    this.name = spec_name
    this.quantity = quantity
    this.price_base = price_base
    this.discount = discount
    this.price_discount = price_discount
  }
}