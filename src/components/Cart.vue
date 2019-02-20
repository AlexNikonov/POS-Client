<template>
  <v-layout column align-space-between>
    <v-flex xs12>
      <v-layout item row wrap py-2 v-for="item in items" :key="item.id" class="item-row  ">
        <v-flex lg2>{{ item.brand }}</v-flex>
        <v-flex lg2>{{ item.number }}</v-flex>
        <v-flex lg2>{{ item.name }}</v-flex>
        <v-flex lg2 pl-5>
          <v-text-field
            mask="##"
            :value="item.quantity"
            @input="updateQuantity(item, $event)"
            append-outer-icon="add"
            @click:append-outer="incrementQuantity(item)"
            prepend-icon="remove"
            @click:prepend="decrementQuantity(item)">
          </v-text-field>
        </v-flex>
        <v-flex lg2 pl-4>
          <v-text-field
            type=number
            :value="item.price"
            @change="updatePrice(item, $event)"
            append-outer-icon="add"
            @click:append-outer="incrementPrice(item)"
            prepend-icon="remove"
            @click:prepend="decrementPrice(item)">
          </v-text-field>
        </v-flex>
        <v-flex lg1 pl-5>
          <v-btn icon class="hidden-xs-only" @click="removeItem(item)">
            <v-icon>remove_circle_outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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
      г. Минск, ул. Бельского, 71
      <br>
      КОПИЯ ЧЕКА
      <ul v-for="item in items" :key="item.id">
        <li class="print-item">
          <span class="print-item-name">{{ item.brand}} {{ item.number }} {{ item.name }}</span>
          <span class="print-item-price">{{ item.price }}</span>
          <span class="print-item-quantity">{{ item.quantity }}</span>
          <span class="print-item-total">{{ item.quantity * item.price }}</span>
        </li>
      </ul>
      <p class="total">{{ total }}</p>
    </div>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { Printd } from 'printd'

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
  methods: {
    incrementQuantity (item) {
      this.$store.dispatch('cart/incrementQuantity', item)
    },
    decrementQuantity (item) {
      this.$store.dispatch('cart/decrementQuantity', item)
    },
    updateQuantity (item, value) {
      this.$store.dispatch('cart/updateQuantity', { item, value })
    },
    incrementPrice (item) {
      this.$store.dispatch('cart/incrementPrice', { item, value: 0.1 })
    },
    decrementPrice (item) {
      this.$store.dispatch('cart/decrementPrice', { item, value: 0.1 })
    },
    updatePrice (item, value) {
      this.$store.dispatch('cart/updatePrice', { item, value })
    },
    removeItem (item) {
      this.$store.dispatch('cart/removeItem', item)  
    },
    clear () {
      this.$store.dispatch('cart/clearCart')  
    },
    async print () {
      const d = new Printd()
      const cssText = `
        .print-item {
          display: flex;
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
  .item-row {
    border-bottom: 1px solid #000;

    &:last-child {
      border-bottom: none;
    }
  }
  #print-layout {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
  }
</style>
