'use strict'

import { addReceipt } from '@/api/receipt'

var get_uid = () => `f${(~~(Math.random()*1e8)).toString(16)}` 

var round_price = price => Number(parseFloat(Math.round(price * 10) / 10).toFixed(2))

const state = {
  header: {
    cdate: '',
    user_id: 1,
    shop_id: 1,
    price_type: 1

  },
  items: []
}

const mutations = {
  ADD_ITEM (state, item) {
    state.items.push(item)
  },
  REMOVE_ITEM (state, item) {
    state.items = state.items.filter(a => a.id !== item.id)
  },
  UPDATE_ITEM (state, item) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) state.items[index] = item
  },
  INCREMENT_QUANTITY (state, item) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) state.items[index].quantity++
  },
  DECREMENT_QUANTITY (state, item) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1 && state.items[index].quantity > 2) state.items[index].quantity--
  },
  UPDATE_QUANTITY (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) state.items[index].quantity = value
  },
  INCREMENT_PRICE (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) {
      state.items[index].price = round_price(state.items[index].price + value)
    }
  },
  DECREMENT_PRICE (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1 && state.items[index].price > value) {
      state.items[index].price = round_price(state.items[index].price - value)
    }
  },
  UPDATE_PRICE (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) state.items[index].price = round_price(value)
  },
  CLEAR_RECEIPT (state) {
    state.items = []
  }
}

const actions = {
  addItem ({ commit }, item ) {
    const item_to_add = {
      id: get_uid(),
      brand: item.brand || '',
      brand_id: item.brand_id || 0,
      number: item.number || '',
      name: item.name || '',
      quantity: item.quantity || 1,
      price: round_price(item.price) || 0,
      discount: round_price(discount) || 0,
      price_discount: round_price(item.price_discount) || 0,
      product_id: item.product_id || 0
    }
    commit('ADD_ITEM', item_to_add)
  },
  removeItem ({ commit }, item) {
    commit('REMOVE_ITEM', item)
  },
  updateItem ({ commit }, item) {
    commit('UPDATE_ITEM', item)
  },
  incrementQuantity ({ commit }, item) {
    commit('INCREMENT_QUANTITY', item)
  },
  decrementQuantity ({ commit }, item) {
    commit('DECREMENT_QUANTITY', item)
  },
  updateQuantity ({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload)
  },
  incrementPrice ({ commit }, payload) {
    commit('INCREMENT_PRICE', payload)
  },
  decrementPrice ({ commit }, payload) {
    commit('DECREMENT_PRICE', payload)
  },
  updatePrice ({ commit }, payload) {
    commit('UPDATE_PRICE', payload)
  },
  clearCart ({ commit }) {
    commit('CLEAR_RECEIPT')
  },
  async saveCart ({ commit, state }) {
    try {
      await addReceipt({ header: state.header, items: state.items })
      commit('CLEAR_RECEIPT')
    } catch (e) {
      alert(e)
    }
  }
}

const getters = {
  items: state => state.items,
  total: state => {
    return state.items ? round_price(state.items.reduce((total, item) => {
      return total + item.price * item.quantity}, 0)).toFixed(2) : 0
  }
}

const cartModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default cartModule