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
    <v-flex xs12 mb-3 v-if="error">
      {{ error }}
    </v-flex>
    <v-flex xs12 mb-5>
      <loading-indicator :IsLoading="isLoading" />
    </v-flex>
    <v-flex xs12 mb-5 align-start>
      <transition name="fade" mode="out-in">
          <router-view
            :key="$route.fullPath"
            @error="errorHandler"
            @loading="loadingHandler"
            @router_go_to="routerGoTo"
          />
      </transition>
    </v-flex>
  </v-layout> 
</template>

<script>
import LoadingAndErrorMixin from '@/mixins/LoadingAndError'

export default {
  name: 'search',
  mixins: [LoadingAndErrorMixin],
  methods: {
    routerGoTo (routerLinkObject) {
      this.$router.push(routerLinkObject)
    },
    search_product_by_substring (value) {
      this.routerGoTo({
        name: 'search-by-substring',
        params: { substring: value }
      })
    }
  }
}
</script>


