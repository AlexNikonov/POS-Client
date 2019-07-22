<template>
<v-layout column>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs4 ml-3>
          <v-select
            outline
            :label="$t('date_range.label')"
            :items="$t('date_range.items')"
            v-model="current_date_range"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 mb-3 v-if="error">
      {{ error }}
    </v-flex>
    <v-flex xs12 mb-5>
      <loading-indicator :IsLoading="isLoading" />
    </v-flex>
    <v-flex xs12>
      <v-layout column>
        <v-flex>
          <receipts-list
          :date_range="current_date_range"
          @error="errorHandler"
          @loading="loadingHandler"
          />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import LoadingAndErrorMixin from '@/mixins/LoadingAndError'
import ReceiptsList from '@/components/ReceiptsList.vue'

export default {
  name: 'receipts',
  data () {
    return {
      current_date_range: 'today'
    }
  },
  mixins: [LoadingAndErrorMixin],
  watch: {
    current_date_range: {
      immediate: true,
      handler( new_date_range ) {
        this.$router.push({
          name: 'receipts',
          params: { date_range: new_date_range }
        })  
      }
    }
  },
  components: {
    ReceiptsList
  }
}
</script>

