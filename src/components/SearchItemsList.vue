<template>
  <div>
    <component
      :is="currentView"
      v-bind="currentViewProperties"
      @edit-item="edit_item"
      @add-item="add_to_cart"/>
  </div>
</template>

<script>
import Types from '@/types'
import SearchItems from '@/components/SearchItems.vue'
import ProductItemEditable from '@/components/ProductItemEditable.vue'
import { getListByBrandAndNumber } from '@/api/ProductRepository'

export default {
  name: 'search-items-list',
  props: ['brand_id', 'string'],
  data () {
    return {
      items: [],
      item: {},
      currentView: SearchItems
    }
  },
  components: {
    SearchItems,
    ProductItemEditable
  },
  computed: {
    currentViewProperties () {
      switch (this.currentView) {
        case SearchItems:
          return { items: this.items }
        case ProductItemEditable:
          return { item: this.item, showAddButton: true }
      }
      return SearchItems
    }
  },
  methods: {
    edit_item (item, selected_price) {
      //this.$toast(`$t('item_added') ${ item.number }`)
      const item_to_add = {
        ...item,
        price_base: selected_price,
        price_discount: selected_price,
        quantity: 1
      }
      this.item = item_to_add
      this.currentView = ProductItemEditable
      //this.$refs.ProductAddDetailsModal.open(item_to_add)
      //this.$store.dispatch(Types.store.actions.CART_ADD_ITEM, item_to_add)
    },
    add_to_cart () {
      this.$store.dispatch(Types.store.actions.CART_ADD_ITEM, this.item)
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
