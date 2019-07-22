<template>
  <v-layout row align-stretch py-2 px-2 class="blue-grey lighten-2">
    <v-flex xs1>
      {{ $d(new Date(item.created), 'time') }}
    </v-flex>
    <v-flex xs10 px-1 class="blue-grey lighten-5">
      <product-item v-for="row in item.items" :item="row" :key="row.line_id" />
    </v-flex>
    <v-flex xs1 class="text-xs-right" px-3>
      {{ item.total }} 
    </v-flex>
  </v-layout>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'

export default {
  name: 'receipt-item',
  props: {
    item: {
      type: Object
    }
  },
  components: {
    ProductItem
  }
}
</script>



