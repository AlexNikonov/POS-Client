<template>
  <v-content>
    <v-layout item row wrap py-2 v-for="item in items"
      :key="`${ item.customer_id }-${ item.search_string }`">
      <v-flex lg1>{{ item.customer_code }}</v-flex>
      <v-flex lg2>{{ item.brand }}</v-flex>
      <v-flex lg2>{{ item.number }}</v-flex>
      <v-flex lg4>{{ item.name }}</v-flex>
      <v-flex lg1>{{ item.quantity }}</v-flex>
      <v-flex lg1><a @click.prevent.stop="add_to_cart(item, item.price)">{{ item.price.toFixed(2) }}</a></v-flex>
      <v-flex lg1><a @click.prevent.stop="add_to_cart(item, item.fixed_price)">{{ item.fixed_price.toFixed(2) }}</a></v-flex>
    </v-layout>

    <ul v-if="errors && errors.length">
      <li v-for="error in errors" :key=error.id>
        {{ error.message }}
      </li>
    </ul>

    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :timeout="1000"
    >
      Товар {{ snackbar_item.number }} добавлен
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import api from '@/api/index'

export default {
  name: 'search-items-list',
  props: ['brand_id', 'string'],
  data () {
    return {
      snackbar: false,
      snackbar_item: '',
      search_string: '',  
      items: [],
      errors: [],
      response: ''
    }
  },
  methods: {
    add_to_cart (item, selected_price) {
      this.snackbar_item = item
      this.snackbar = true
      const item_to_add = {
        ...item,
        price_base: selected_price,
        price_discount: selected_price,
        quantity: 1
      }
      this.$store.dispatch('cart/addItem', item_to_add)
    }
  },
  async mounted () {
    try {
      this.errors = []
      const response = await api.get(
        `products/search/exact/brand_id/${ this.brand_id }/string/${ this.string }`
      )
      this.response = response
      this.items = response.data.list
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid #ECEFF1
}
</style>
