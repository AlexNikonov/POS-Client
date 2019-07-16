<template>
  <v-layout column>
    <v-flex v-if="items">
      <orders-list-item v-for="item in items" :key="item.id" :item="item"></orders-list-item>
    </v-flex>
  </v-layout>
</template>

<script>
import OrderRepository from '@/api/OrderRepository'
import OrdersListItem from './OrdersListItem.vue'

export default {
  name: 'orders-list',
  props: ['substring', 'phone_number', 'date_range'],
  data () {
    return {
      items: []
    }
  },
  components: {
    OrdersListItem
  },
  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true
    }
  },
  methods: {
    async fetchData () {
      if (this.substring) {
        this.items = await OrderRepository.getListBySubstring(this.substring)
      } else if (this.phone_number) {
        this.items = await OrderRepository.getListByPhoneNumber(this.phone_number)
      } else if (this.date_range) {
        this.items = await OrderRepository.getListByDateRange(this.date_range)
      }
    }
  }
}
</script>

  