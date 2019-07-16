<template>
  <v-layout column justify-center align-center>
    <v-flex xs12>
          <v-text-field
            slot="extension"
            append-icon="search"
            class="lg-2 white--text"
            solo-inverted
            flat
            hide-details
            clearable
            :disabled="isLoading"
            :loading="isLoading"
            @change="search_product_by_substring($event)"
          ></v-text-field>
    </v-flex>
    <v-flex xs12 mt-3 v-if="error">
      {{ error }}
    </v-flex>
    <v-flex xs12 mt-5>
        <loading-indicator :IsLoading="isLoading" />
    </v-flex>
    <v-flex xs12 mt-5>
      <transition name="fade" mode="out-in">
          <router-view
            v-show="!isLoading"
            v-on:[Types.events.ERROR]="errorHandler"
            v-on:[Types.events.LOADING]="loadingHandler"
          />
      </transition>
    </v-flex>
    <product-add-details-modal ref="ProductAddDetailsModal" />
  </v-layout> 
</template>

<script>
import Types from '@/types'
import LoadingAndErrorMixin from '@/mixins/LoadingAndError'
import ProductAddDetailsModal from './ProductAddDetailsModal.vue'

export default {
  name: 'search',
  data () {
    return {
      Types: Object.freeze(Types)
    }
  },
  mixins: [LoadingAndErrorMixin],
  components: {
    ProductAddDetailsModal
  },
  methods: {
    add_to_cart (item) {
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


