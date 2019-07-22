import api from './index'
import PriceItem from '@/models/PriceItem'
import ProductSearchItem from '@/models/ProductSearchItem';

const resource = '/products/search'

export async function getListBySubstring(value) {
  const response = await api.get(`${ resource }/${ value }`)
  return response.data.list.map(item => new ProductSearchItem(item))
}

export async function getListByBrandAndNumber(brand_id, string) {
  const response = await api.get(`${ resource }/exact/brand_id/${ brand_id }/string/${ string }`)
  return response.data.list.map(item => new PriceItem(item))
}
