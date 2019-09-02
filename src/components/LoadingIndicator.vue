<template>
  <div class="loader-container">
    <fulfilling-square-spinner
      v-if="IsLoading"
      :size="50"
      color="#ff1d5e"
    />
  </div>
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

<style scoped>
  .loader-container {
    padding: 2em;
  }
</style>

