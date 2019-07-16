<template>
<div>
  <loading-indicator />
  {{ error }}
  <slot />
</div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  data() {
    return {
      error: null
    }
  },
  components: {
    LoadingIndicator
  },
  methods: {
    interceptError(error) {
      this.error = error;
      console.log('IEEROOR')
    }
  },
  //errorCaptured (error, vm, info) {
  //  this.interceptError(error);
  //}
}
</script>
