<template>
  <div>
    <v-layout item row wrap py-2 v-for="item in items" :key="`${ item.brand }-${ item.search_string }-${ item.name }`">
      <v-flex lg1>{{ item.customer_code }}</v-flex>
      <v-flex lg2>{{ item.brand }}</v-flex>
      <v-flex lg2>{{ item.number }}</v-flex>
      <v-flex lg4>{{ item.name }}</v-flex>
      <v-flex lg1>{{ item.quantity }}</v-flex>
      <v-flex lg1><a @click.prevent.stop="$emit('edit-item', item, item.price_base)">{{ item.price_base | price_format }}</a></v-flex>
      <v-flex lg1><a @click.prevent.stop="$emit('edit-item', item, item.price_fixed)">{{ item.price_fixed | price_format }}</a></v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'search-items',
  props: [ 'items' ]
}
</script>
