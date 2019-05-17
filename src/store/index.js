import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './cart'
import common from './common'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    cart: cart,
    common: common
  },
  plugins: [
    createPersistedState({
      key: 'pos'
    })
  ]
})

export default store 