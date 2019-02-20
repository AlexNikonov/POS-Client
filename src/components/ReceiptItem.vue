<template>
  <v-layout column>
    <v-flex xs1>

    </v-flex>
    <v-flex xs10>
      {{ item }} 
    </v-flex>
    <v-flex xs1>
      
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'receipt-item',
  props: {
    item: {
      type: Object
    }
  },
  computed: {

  }
}
</script>

