import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './cart'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    cart
  },
  plugins: [
    createPersistedState({
      key: 'pos_cart',
      paths: ['cart']
    })
  ]
})

export default store 