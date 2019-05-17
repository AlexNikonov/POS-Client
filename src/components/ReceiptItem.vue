<template>
  <v-layout row align-stretch py-2 px-2 class="blue-grey lighten-2">
    <v-flex xs2>
      {{ $d(new Date(item.created), 'time') }}
    </v-flex>
    <v-flex xs9 px-2 class="blue-grey lighten-5">
      <v-layout row nowrap align-stretch v-for="row in item.items" :key="row.line_id">
        <v-flex xs2>{{ row.brand }}</v-flex>
        <v-flex xs2>{{ row.number }}</v-flex>
        <v-flex xs2>{{ row.name }}</v-flex>
        <v-flex xs1>{{ row.quantity }}</v-flex>
        <v-flex xs1>{{ row.price_base }}</v-flex>
        <v-flex xs1>{{ row.discount }}</v-flex>
        <v-flex xs1>{{ row.price_discount }}</v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs1 class="text-xs-right" px-3>
      {{ item.total }} 
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'receipt-item',
  props: {
    item: {
      type: Object
    }
  },
  computed: {

  }
}
</script>

<style scoped>
  .mmmm { margin-bottom: auto; }

</style>


