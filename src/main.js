import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import i18n from './locale/index'
import VuetifyToast from 'vuetify-toast-snackbar'
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
	if (!value) return '0'
  return value.toFixed(2)
})

Vue.filter('name_format', function (value) {
  if (!value) return ''
  return value.substring(0, 80) + ' ...'
})

Vue.filter('short_name_format', function (value) {
  if (!value) return ''
  return value.substring(0, 40) + ' ...'
})

Vue.config.errorHandler = function (err, vm, info) {
  console.log('error handler: ' + err + ' --- ' + info)
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
}

window.addEventListener('unhandledrejection', function(event) {
  //handle error here
  //event.promise contains the promise object
  //event.reason contains the reason for the rejection
  console.log('Unhandled Rejection: ' + event.reason)
});

Vue.use(VuetifyToast, {
	x: 'center', // default
	y: 'bottom', // default
	color: 'info', // default
	icon: 'info',
	classes: [
		'body-2'
	],
	timeout: 2000, // default
	dismissable: true, // default
	autoHeight: false, // default
	multiLine: false, // default
	vertical: false, // default
	queueable: false, // default
	showClose: false, // default
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast' // default
})

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
