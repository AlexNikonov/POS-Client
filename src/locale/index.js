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

const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    },
    time: {
      hour: 'numeric', minute: 'numeric', hour12: true  
    }
  },
  'ru': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
    },
    time: {
      hour: 'numeric', minute: 'numeric', hour12: false  
    }
  }
}

const i18n = new VueI18n({
  locale: 'ru',
  numberFormats,
  dateTimeFormats,
  messages
})
//this.$i18n.locale = val; // change locale on live

export default i18n