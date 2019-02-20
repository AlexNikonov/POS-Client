import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './messages'

Vue.use(VueI18n)

const numberFormats = {
  'en': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  },
  'ru': {
    currency: {
      style: 'currency', currency: 'BYN', currencyDisplay: 'symbol'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ru',
  numberFormats,
  messages
})
//this.$i18n.locale = val; // change locale on live

export default i18n