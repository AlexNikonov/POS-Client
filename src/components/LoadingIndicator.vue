<template>
  <fulfilling-square-spinner
    v-if="IsLoading"
    :animation-duration="4000"
    :size="50"
    color="#ff1d5e"
  />
</template>

<script>
import { FulfillingSquareSpinner } from 'epic-spinners'

export default {
  name: 'loading-indicator',
  computed: {
    IsLoading () {
      return this.$store.getters['common/loading']
    }
  },
  components: {
    FulfillingSquareSpinner,
  }
}
</script>
