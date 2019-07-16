import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  data () {
    return {
      isLoading: false,
      error: null
    }
  },
  components: {
    LoadingIndicator
  },
  methods: {
    errorHandler (error) {
      this.error = error
    },
    loadingHandler (isLoading) {
      this.isLoading = isLoading
    }
  },
  errorCaptured (error) {
    console.log('errorCaptured')
    this.error = error
  }
}
