import Product from '@/models/Product'

export default class PriceItem extends Product {
  constructor (item) {
    super(item)
    this.price_fixed = item.fixed_price || 0
  }
}