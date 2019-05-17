import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import i18n from './locale/index'
import 'vuetify/dist/vuetify.min.css'

const moment = require('moment')
require('moment/locale/ru')
Vue.use(VueMoment, { moment })

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})

Vue.filter('price_format', function (value) {
  if (!value) return 0
  return value.toFixed(2)
})

Vue.filter('name_format', function (value) {
  if (!value) return ''
  return value.substring(0, 80) + ' ...'
})

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
