<template>
  <v-snackbar
    v-model="visibility"
    :bottom="true"
    :timeout="1000"
  >
    {{ $t('item_added') }} {{ snackbar_item.number }}
    <v-btn
      color="pink"
      flat
      @click="visibility=false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visibility: false
    }
  },
  mounted () {
    this.visibility = this.isVisible
  }
}
</script>
