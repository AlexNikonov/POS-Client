<template>
  <fulfilling-square-spinner
    v-if="IsLoading"
    :size="50"
    color="#ff1d5e"
  />
</template>

<script>
import { FulfillingSquareSpinner } from 'epic-spinners'

export default {
  name: 'loading-indicator',
  props: {
    IsLoading: Boolean
  },
  components: {
    FulfillingSquareSpinner
  }
}
</script>
