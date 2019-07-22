export default function(args) {
  this.id = args.id
  this.created = args.created_at
  this.price_type_id = args.price_type.id
  this.price_type_name = args.price_type.name
  this.user_id = args.user ? args.user.id : 0
  this.user_name = args.user.name
  this.shop_id = args.shop ? args.shop.id : 0
  this.shop_name = args.shop ? args.shop.name : ''
  this.items = []
  this.total = args.receipts_specs.reduce(
    (total, item) => {
      this.items.push({
        line_id: item.line_id,
        brand: item.brand,
        brand_id: item.brand_id,
        number: item.number,
        search_string: item.search_string,
        name: item.name.substring(0, 50),
        quantity: item.quantity,
        price_base: Number(item.price),
        discount: item.discount,
        price_discount: Number(item.price_discount),
        product_id: item.product_id   
      })
      return total + item.price_discount * item.quantity
    }, 0
  )
  return Object.freeze(this)
}


