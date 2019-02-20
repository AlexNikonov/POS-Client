export default function(args) {
  this.id = args.id
  this.created = args.created_at
  this.price_type_id = args.price_type.id
  this.price_type_name = args.price_type.name
  this.user_id = args.user.id
  this.user_name = args.user.name
  this.shop_id = args.shop.id
  this.shop.name = args.shop.name
  this.items = []
  args.receipts_specs.map(
    item => this.items.push({
      line_id: item.line_id,
      brand: item.brand,
      brand_id: item.brand_id,
      number: item.number,
      search_string: item.search_string,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      price_discount: item.price_discount,
      product_id: item.product_id   
    })
  )
  this.total = args.receipts_specs.reduce(
    (total, item) => {
      this.items.push({
        line_id: item.line_id,
        brand: item.brand,
        brand_id: item.brand_id,
        number: item.number,
        search_string: item.search_string,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        price_discount: item.price_discount,
        product_id: item.product_id   
      })
      return total + item.price_discount * item.quantity
    }, 0
  )

}