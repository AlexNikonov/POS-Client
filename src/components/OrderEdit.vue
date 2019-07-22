<template>
  <v-layout v-if="order" column class="indigo lighten-5">
    <v-flex lg10 px-2 py-2>
      <v-layout align-content-space-around column>
        <v-flex lg2>{{ order.id }}</v-flex>
        <v-flex lg2>{{ order.updated_at }}</v-flex>
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
          <product-item-editable editable v-for="item in items" 
            :key = "item.id"
            :item = "item"
            @update-quantity = "updateQuantity"
            @remove-item = "remove"
            @add-item = "add"
          />
        </v-layout>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import OrderRepository from '@/api/OrderRepository'
import ProductItemEditable from '@/components/ProductItemEditable.vue'

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
  components: {
    ProductItemEditable
  },
  watch: {
    $route: {
      async handler () {
        this.order = await OrderRepository.getOrder(this.id)
      },
      immediate: true
    }
  },
  methods: {
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
      this.$store.dispatch('cart/addItem', item)
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
