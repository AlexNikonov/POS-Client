<template>
  <v-layout column>
    <v-flex xs12>
      <v-layout row justify-center>
        <v-flex xs4 mr-3>
          <v-text-field
            slot="extension"
            append-icon="search"
            class="lg-2 white--text"
            solo-inverted
            flat
            hide-details
            clearable
            @change="search_product_by_substring($event)"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <transition name="fade" mode="out-in">
        <router-view />>
      </transition>
    </v-flex>
    <product-add-details-modal ref="ProductAddDetailsModal" />
  </v-layout> 
</template>

<script>
import api from '@/api/index'
import ProductAddDetailsModal from './ProductAddDetailsModal.vue'

export default {
  name: 'search',
  components: {
    ProductAddDetailsModal
  },
  methods: {
    add_to_cart(item) {
      this.$refs.ProductAddDetailsModal.open(item)
    },
    search_product_by_substring (value) {
      this.$router.push({
        name: 'search-by-substring',
        params: { substring: value }
      })
    } 
  }
}
</script>
