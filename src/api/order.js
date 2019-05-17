import api from './index'
import Receipt from '@/models/receipt'

export async function getListByDateRange (date_range) {
  try {
    const data = await api.get(`receipts/date_range/${ date_range }`)
    return data.data.list.map(item => new Receipt(item))
  } catch (err) {
    throw new Error("Can't get receipts! Error: " + err.message)
  }
}

export async function addReceipt (receipt) {
  try {
    const response = await api.post('/receipts', receipt)
    if (response.status !== 200) throw new Error("Can't add receipt!")
    return response
  } catch (err) {
    throw new Error("Can't add receipt! Error: " + err.message)
  } 
}