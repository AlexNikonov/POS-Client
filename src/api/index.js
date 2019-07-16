import axios from 'axios'
import store from '@/store/index'

const instance = axios.create({
  baseURL: 'http://localhost:3000/v1',
  timeout: 0.1 * 60 * 1000
})

instance.interceptors.request.use(
  config => {
    store.commit('common/SET_LOADING_STATE', true)
    return config
  },
  error => {
    store.commit('common/SET_LOADING_STATE', false)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    store.commit('common/SET_LOADING_STATE', false)
    return response
  },
  error => {
    store.commit('common/SET_LOADING_STATE', false)
    return Promise.reject(error)
  }
)

export default instance