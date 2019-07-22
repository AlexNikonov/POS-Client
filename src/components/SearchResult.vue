<template>
  <v-layout column class="full_width">
    <v-flex xs12 v-if="items.lenght == 0">
      {{ $t('not_found') }}
    </v-flex>
  
    <v-flex xs12 py-2 v-for="item in items" :key=item.id>
      <a @click.prevent.stop="$emit(
        'router_go_to',
        {
          name: 'search-items-list',
          params: { brand_id: item.brand_id, string: item.search_string }
        }
      )">
        {{ item.short_name }}
      </a>
    </v-flex>
  </v-layout>
</template>

<script>
import Types from '@/types'
import { getListBySubstring } from '@/api/ProductRepository'

export default {
  name: 'search-result',
  props: ['substring'],
  data () {
    return {
      items: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      async handler() {
        try {
          this.$emit(Types.events.LOADING, true)
          this.items = await getListBySubstring(this.substring)
          this.$emit(Types.events.LOADING, false)
        } catch (error) {
          this.$emit(Types.events.LOADING, false)
          this.$emit(Types.events.ERROR, error)
        }
      }
    }
  }
}
</script>

<style scoped>
  .full_width {
    width: 100%;
  }
</style>
