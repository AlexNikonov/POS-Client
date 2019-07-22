import api from './index'
import Receipt from '@/models/Receipt'

export async function getListByDateRange (date_range) {
  const data = await api.get(`receipts/date_range/${ date_range }`)
  return data.data.list.map(item => new Receipt(item))
}

export async function addReceipt (receipt) {
  const response = await api.post('/receipts', receipt)
  if (response.status !== 200) throw new Error("Can't add receipt!")
  return response 
}