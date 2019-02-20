<template>
  <v-layout v-if="order" column class="indigo lighten-5">
    <v-flex lg10 px-2 py-2>
      <v-layout align-content-space-around column>
        <v-flex lg2>{{ order.id }}</v-flex>
        <v-flex lg2>{{ order.updated_at | moment('LLL') }}</v-flex>
        <v-flex lg2>{{ order.creator }}</v-flex>
        <v-flex>{{ order.status }}</v-flex>
        <v-flex>{{ order.client }}</v-flex>
        <v-flex>({{ order.phone_code }}) {{ order.phone }} - {{ order.phone_operator_code }}</v-flex>
        <v-flex>{{ order.comment }}</v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg12 px-2 py-2>
      <v-flex v-for="row in order.order_products" :key=row.line_id class="item-row">
        <v-layout row nowrap align-center>
          <v-flex lg1>{{ row.customer_code }}</v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.brand }}</v-flex>
          <v-flex lg2 pl-1 py-1>{{ row.number }}</v-flex>
          <v-flex lg2 pl-1 py-1 caption>{{ row.spec_name }}</v-flex>
          <v-flex lg2 px-4 py-1>
            <v-text-field
              mask="##"
              :value="row.quantity"
              @input="updateQuantity(row, $event)"
              append-outer-icon="add"
              @click:append-outer="incrementQuantity(row)"
              prepend-icon="remove"
              @click:prepend="decrementQuantity(row)">
            </v-text-field>
          </v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.price.toFixed(2) }}</v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.discount.toFixed(2) }}</v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.price_discount.toFixed(2) }}</v-flex>
          <v-flex lg1 py-1>
            <v-btn icon class="hidden-xs-only" @click="add(row)">
              <v-icon large>add_circle_outline</v-icon>
            </v-btn>
          </v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.status }}</v-flex>
          <v-flex lg1 py-1>
            <v-btn icon class="hidden-xs-only" @click="remove(row)">
              <v-icon large>remove_circle_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>

import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'order',
  data () {
    return {
      errors: [],
      order: {}
    }
  },
  props: {
    id: {
      required: true
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions('cart', ['addItem']),
    async fetchData () {
      var url = ''
      if (this.id) {
        url = `http://localhost:3000/v1/orders/${ this.id }`
        try {
          this.errors = []
          const response = await axios.get(url)
          this.order = response.data.item
        } catch (e) {
          this.errors.push(e)
        }
      }
    },
    incrementQuantity (item) {
      item.quantity++
    },
    decrementQuantity (item) {
      if (item.quantity > 1) item.quantity--
    },
    remove (item) {
      const index = this.order.items.findIndex(o => o.line_id === item.line_id )
      if (index > -1) this.order.items.splice(index, 1)
    },
    add (item) {
      this.addItem(item)
    }
  }
}
</script>

<style scoped lang="scss">
  .item-row {
    border-bottom: 1px solid #000;

    &:last-child {
      border-bottom: none
    }
  }
</style>
