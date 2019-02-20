import api from './index'

export async function getListByDateRange (date_range) {
  try {
    const data = await api.get(`receipts/date_range/${ date_range }`)
    return data.data.list
  } catch (e) {
    throw new Error('error')
  }
}

export async function addReceipt (receipt) {
  try {
    let response = await api.post(receipt)
    if (response.status !== 200) throw new Error("Can't add receipt!")
    return response
  } catch (err) {
    throw new Error("Can't add receipt! Error: " + err.message)
  } 
}