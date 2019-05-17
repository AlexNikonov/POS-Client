<template>
  <v-content>
    <v-layout column v-if="items" justify-start>
      <loading-indicator />
      <v-flex xs12 py-2 v-for="item in items" :key=item.id>
        <a :href="item.link">{{ item.brand}} - {{ item.number}} - {{ item.name }}</a>
      </v-flex>
    </v-layout>
    <ul v-if="errors && errors.length">
      <li v-for="error in errors" :key=error.id>
        {{ error.message }}
      </li>
    </ul>
  </v-content>
</template>

<script>
import api from '@/api/index'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'search-result',
  props: ['substring'],
  data () {
    return {
      brands: [],
      items: [],
      errors: [],
      response: ''
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async fetchData() {
      try {
        this.errors = []
        const response = await api.get(`products/search/${ this.substring }`)
        this.response = response
        this.items = response.data.list
      } catch (e) {
        this.errors.push(e)
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  components: {
    LoadingIndicator
  }
}
</script>

<style scoped>

</style>
