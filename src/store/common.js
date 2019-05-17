'use strict'

export default {
  namespaced: true,
  state: {
    status: {
      loading: false,
      success: false,
      error: ''
    }
  },
  getters: {
    status: state => state.status,
    loading: state => state.status.loading
  },
  mutations: {
    SET_LOADING_STATE (state, payload) {
      state.status.loading = payload
    }
  }
}
