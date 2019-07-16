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
      <v-flex v-for="row in order.products" :key=row.line_id class="item-row">
        <v-layout row nowrap align-center>
          <v-flex lg1>{{ row.customer_code }}</v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.brand }}</v-flex>
          <v-flex lg2 pl-1 py-1>{{ row.number }}</v-flex>
          <v-flex lg2 pl-1 py-1 caption>{{ row.spec_name }}</v-flex>
          <v-flex lg2 px-4 py-1>
            <base-input-number :value="row.quantity" :width="'2rem'" @change="updateQuantity"/>
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
          <v-flex lg1 pl-1 py-1>{{ row.price_base | price_format }}</v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.discount | price_format }}</v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.price_discount | price_format }}</v-flex>
          <v-flex lg1 py-1>
            <v-btn icon class="hidden-xs-only" @click="add(row)">
              <v-icon large>check_circle_outline</v-icon>
            </v-btn>
          </v-flex>
          <v-flex lg1 pl-1 py-1>{{ row.status }}</v-flex>
          <v-flex lg1 py-1>
            <v-btn icon class="hidden-xs-only" @click="remove(row)">
              <v-icon large>highlight_off</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>

import OrderRepository from '@/api/OrderRepository'
import { mapActions } from 'vuex'

export default {
  name: 'order',
  data () {
    return {
      order: {}
    }
  },
  props: {
    id: {
      required: true
    }
  },
  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true
    }
  },
  methods: {
    ...mapActions('cart', ['addItem']),
    async fetchData () {
      this.order = await OrderRepository.getOrder(this.id)
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
