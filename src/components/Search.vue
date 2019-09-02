<template>
  <div class="container">
    <div class="centered">
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
      />
    </div>
    <div class="centered" v-if="error">
      {{ error }}
    </div>
    <div class="centered">
      <loading-indicator :IsLoading="isLoading" />
    </div>
    <content>
      <transition name="fade" mode="out-in">
          <router-view
            :key="$route.fullPath"
            @error="errorHandler"
            @loading="loadingHandler"
            @router_go_to="routerGoTo"
          />
      </transition>
    </content>
  </div> 
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

<style scoped>
  content {
    text-align: left;
  }
  .container {
    text-align: center;
  }
  .centered {
    width: 50%;
    margin: 0 auto;
  }
</style>



