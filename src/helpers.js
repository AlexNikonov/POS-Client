export const get_uid = () => `f${(~~(Math.random()*1e8)).toString(16)}` 

export const round_number = price =>
  Number(parseFloat(Math.round(price * 10) / 10).toFixed(2))

export const get_discount = (price_base, price_discount) =>
  round_number(100 - price_discount / price_base * 100)

export const get_price_discount = (price_base, discount) =>
  round_number( (100 - discount) / 100 * price_base )