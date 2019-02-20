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
            @change="update($event)"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout column>
        <v-flex>
          <p v-if="!$options.items">Нет чеков за указанный период.</p>
          <receipt-item v-for="item in $options.items" :key="item.id" :item=item></receipt-item>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { getListByDateRange } from '@/api/receipt'
import ReceiptItem from '@/components/ReceiptItem.vue'

export default {
  name: 'receipts-list',
  items: [],
  props: {
    date_range: {
      default: 'today'
    }
  },
  data () {
    return {
      current_date_range: '' 
    }
  },
  methods: {
    async fetchData () {
      try {
        this.$options.items = await getListByDateRange(this.current_date_range)
      } catch (err) {
        
      }
    },
    update (date_range) {
      this.$router.push({
        name: 'receipts-list',
        params: { date_range }
      })
    }
  },
  mounted () {
    this.current_date_range = this.date_range
    this.fetchData()
  },
  beforeRouteUpdate (to, from, next) {
    this.current_date_range = to.params.date_range
    this.fetchData()
    next()
  },
  components: {
    ReceiptItem
  }
}
</script>

<style scoped>

</style>
