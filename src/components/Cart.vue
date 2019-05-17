<template>
  <v-layout column align-space-between>
    <v-flex xs12>
      <cart-item v-for="item in items" :key="item.id" :item="item" />
    </v-flex>
    <v-flex>
      <v-layout item row nowrap py-2>
        <v-flex xs2 offset-xs8 pl-4  title>
          <p class="text-xs-center">{{ total }} руб.</p>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
      <v-btn @click="clear">Очистить</v-btn>
      <v-btn @click="print">Печать</v-btn>
      <v-btn @click="save">Сохранить</v-btn>
    </v-flex>
    <div id="print-layout" v-if="printLayoutVisibility">
      магазин "Автомаркет"
      <br>
      ООО "Авто-НАСА"
      <br>
      г. Минск, ул. Бельского, 71
      <br>
      <h2 class="title"><b>К О П И Я&nbsp;&nbsp;&nbsp;Ч Е К А</b></h2>
      <ul v-for="item in items" :key="item.id">
        <li class="print-item">
          <span class="print-item-name">{{ item.brand}} {{ item.number }} {{ item.name }}</span>
          <span class="print-item-price">{{ item.price_discount | price_format }}</span>
          <span class="print-item-quantity">{{ item.quantity }}</span>
          <span class="print-item-total">{{ item.quantity * item.price_discount }}</span>
        </li>
      </ul>
      <p class="total">ИТОГО:&nbsp;&nbsp;{{ total }}&nbsp;руб</p>
    </div>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { Printd } from 'printd'
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'cart',
  data () {
    return {
      printLayoutVisibility: false
    }
  },
    computed: {
    ...mapGetters('cart', ['items', 'total'])
  },
  components: {
    CartItem
  },
  methods: {
    clear () {
      this.$store.dispatch('cart/clearCart')  
    },
    async print () {
      const d = new Printd()
      const cssText = `
        .title {
          text-align: center;
        }
        ul {
          display: flex;
          flex-direction: column;
        }
        .print-item {
          display: flex;
          padding-bottom: 8px;
          border-bottom: 1px dotted #767a82;
        }
        .print-item :last-child {
          border: 0;
        }
        .print-item-name {
          flex-basis: 60%;
        }
        .print-item-quantity {
          flex-basis: 10%;
          text-align: right;
        }
        .print-item-price {
          flex-basis: 15%;
          text-align: right;
        }
        .print-item-total {
          flex-basis: 15%;
          text-align: right;
        }
        .total {
          text-align: right;
          font-weight: bold;
          font-size: 24px;
        }
        #print-layout ul {
          padding: 0;
        }
      }
      `
      this.printLayoutVisibility = true
      await this.$nextTick()
      d.print(document.getElementById('print-layout'), cssText)
      this.printLayoutVisibility = false
    },
    save () {
      this.$store.dispatch('cart/saveCart')
    }
  }
}
</script>

<style scoped lang="scss">
  #print-layout {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
  }
  #styled-input {
    height: 40px;
    font-size: 8pt;
  }
  .styled-input label[for] {
    height: 40px;
    font-size: 8pt;
  }
</style>
