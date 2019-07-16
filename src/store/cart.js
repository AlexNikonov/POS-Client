'use strict'

import { addReceipt } from '@/api/ReceiptRepository'
import { get_uid, round_number, get_discount, get_price_discount } from '@/helpers'

const state = {
  header: {
    cdate: '',
    user_id: 1,
    shop_id: 1,
    price_type_id: 1

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
  UPDATE_QUANTITY (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) state.items[index].quantity = value
  },
  UPDATE_DISCOUNT (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) {    
      state.items[index].price_discount = get_price_discount(state.items[index].price_base, value)
      state.items[index].discount = round_number(value)
    }
  },
  UPDATE_PRICE (state, { item, value }) {
    const index = state.items.findIndex(a => a.id === item.id);
    if (index > -1) {
      state.items[index].discount = get_discount(state.items[index].price_base, value)
      state.items[index].price_discount = round_number(value)
    }
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
      price_base: round_number(item.price_base) || 0,
      discount: round_number(item.discount) || 0,
      price_discount: round_number(item.price_discount) || 0,
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
  updateQuantity ({ commit }, quantity) {
    commit('UPDATE_QUANTITY', quantity)
  },
  updateDiscount ({ commit }, discount) {
    commit('UPDATE_DISCOUNT', discount)
  },
  updatePrice ({ commit }, price) {
    commit('UPDATE_PRICE', price)
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
    return state.items ? round_number(state.items.reduce((total, item) => {
      return total + item.price_discount * item.quantity}, 0)).toFixed(2) : 0
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
