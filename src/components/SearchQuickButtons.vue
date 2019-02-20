<template>
  <v-layout row wrap py-5>
    <v-flex xs3 px-3 py-2 v-for="item in $options.predefinedItems"
        :key="item.product_id">
      <v-btn
        large
        block
        @click="$emit('add_item_to_cart', item)"
      >
        {{ item.name }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

import predefinedItems from '@/predefinedItems'

export default {
  name: 'search',
  predefinedItems: predefinedItems
}
</script>

