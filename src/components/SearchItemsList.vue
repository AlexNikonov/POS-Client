<template>
  <v-content>
    <v-layout item row wrap py-2 v-for="item in items"
      :key="`${ item.customer_id }-${ item.search_string }`">
      <v-flex lg1>{{ item.customer_code }}</v-flex>
      <v-flex lg2>{{ item.brand }}</v-flex>
      <v-flex lg2>{{ item.number }}</v-flex>
      <v-flex lg4>{{ item.name }}</v-flex>
      <v-flex lg1>{{ item.quantity }}</v-flex>
      <v-flex lg1><a @click.prevent.stop="add_to_cart(item, item.price)">{{ item.price | price_format }}</a></v-flex>
      <v-flex lg1><a @click.prevent.stop="add_to_cart(item, item.fixed_price)">{{ item.fixed_price | price_format }}</a></v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import Types from '@/types'
import { getListByBrandAndNumber } from '@/api/ProductRepository'

export default {
  name: 'search-items-list',
  props: ['brand_id', 'string'],
  data () {
    return {
      items: []
    }
  },
  methods: {
    add_to_cart (item, selected_price) {
      this.$toast(`$t('item_added') ${ snackbar_item.number }`)
      const item_to_add = {
        ...item,
        price_base: selected_price,
        price_discount: selected_price,
        quantity: 1
      }
      this.$store.dispatch(Types.store.actions.CART_ADD_ITEM, item_to_add)
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler() {
        try {
          this.$emit(Types.events.LOADING, true)
          this.items = await getListByBrandAndNumber(this.brand_id, this.string)
          this.$emit(Types.events.LOADING, false)
        } catch (error) {
          this.$emit(Types.events.LOADING, false)
          this.$emit(Types.events.ERROR, error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid #ECEFF1
}
</style>
