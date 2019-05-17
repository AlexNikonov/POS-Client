<template>
  <v-layout column>
    <v-flex v-if="items">
      <order-item v-for="item in items" :key="item.id" :item="item"></order-item>
    </v-flex>
    <ul v-if="errors && errors.length">
      <li v-for="error in errors" :key=error.id>
        {{ error.message }}
      </li>
    </ul>
  </v-layout>
</template>

<script>
import api from '@/api/index'
import OrderItem from './OrderItem.vue'

export default {
  name: 'orders-list',
  props: ['substring', 'phone_number', 'date_range'],
  data () {
    return {
      items: [],
      errors: []
    }
  },
  components: {
    OrderItem
  },
  created () {
    this.fetchData()
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchData()
    next()
  },
  methods: {
    async fetchData () {
      var url = ''
      if (this.substring) {
        url = `orders/substring/${ this.substring }`
      } else if (this.phone_number) {
        url = `orders/phone_number/${ this.phone_number }` 
      } else if (this.date_range) {
        url = `orders/date_range/${ this.date_range }`
      } else {
        url = `orders/date_range/last_week`
      }
      if (url) {
        try {
          this.errors = []
          const response = await api.get(url)
          this.response = response
          console.log(response.data.list)
          this.items = response.data.list
        } catch (e) {
          this.errors.push(e)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
