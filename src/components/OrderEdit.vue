<template>
  <v-layout v-if="order" column class="indigo lighten-5">
    <v-flex lg10 px-2 py-2>
      <v-layout align-content-space-around column>
        <v-flex lg2>{{ order.id }}</v-flex>
        <v-flex lg2>{{ order.updated_at }}</v-flex>
        <v-flex lg2>{{ order.creator }}</v-flex>
        <v-flex>{{ order.status }}</v-flex>
        <v-flex>{{ order.client }}</v-flex>
        <v-flex>{{ phone }}</v-flex>
        <v-flex>{{ order.comment }}</v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg12 px-2 py-2>
      <v-flex v-for="item in order.products" :key=item.line_id class="item-row">
          <product-item-editable 
            :key = "item.id"
            :data = "item"
            showAddButton
            showRemoveButton
            @update-quantity = "updateQuantity"
            @update-discount = "updateDiscount"
            @remove-item = "remove"
            @add-item = "add"
          />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import OrderRepository from '@/api/OrderRepository'
import ProductItemEditable from '@/components/ProductItemEditable.vue'

export default {
  name: 'order-edit',
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
  computed: {
    phone () {
      return this.order.phone ? `(${ this.order.phone_code }) ${ this.order.phone } - ${ this.order.phone_operator_code }` : ''
    }
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
    updateQuantity (item, value) {
      const index = this.order.products.findIndex(a => a.line_id === item.line_id);
      if (index > -1) {
        item.quantity = value
        this.$set(this.order.products, index, item)
      }
    },
    updateDiscount (item, value) {
      const index = this.order.products.findIndex(a => a.line_id === item.line_id);
      if (index > -1) {
        item.discount = value
        this.$set(this.order.products, index, item)
      }
    },
    remove (item) {
      const index = this.order.products.findIndex(o => o.line_id === item.line_id )
      if (index > -1) this.order.products.splice(index, 1)
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
