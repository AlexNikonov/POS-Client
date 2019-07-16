<script>
import ReceiptItem from '@/components/ReceiptItem.vue'
import { getListByDateRange } from '@/api/ReceiptRepository'

export default {
  name: 'receipts-list',
  data () {
    return {
      items: []
    }
  },
  props: {
    date_range: {
      type: String,
      default: 'today'
    }
  },
  components: {
    ReceiptItem
  },
  watch: {
    date_range: {
      immediate: true,
      async handler( new_date_range ) {
        this.items = await getListByDateRange(new_date_range) 
      }
    }
  },
  render (h) {
    if (this.items.length) {
      let r_list = []
      let days_list = this.items.reduce( (accumulator, currentValue) => {
        let current_date = this.$d(new Date(currentValue.created), 'short')
        accumulator[current_date] = accumulator[current_date] || []
        accumulator[current_date].push(currentValue)
        return accumulator 
      }, Object.create(null))
      for (const item_date in days_list) {
        let day_amount = days_list[item_date].reduce( (total, receipt) => {
          return total += receipt.total
        }, 0)
        let day_list = days_list[item_date].map( (receipt) => {
          return h(ReceiptItem, {
            props: {
              item: receipt
            } 
          })
        })
        r_list.push(
          h('div',
            {
              attrs: {
                class: 'receipt'
              }
            },
            [
              h('h2', item_date + ' / ' + day_amount + ' руб.'),
              ...day_list    
            ]
          )
        )
      }
      return h('div', {}, r_list )
    } else {
      return h('p', 'Нет чеков за указанный период.')
    }
  }
}
</script>

<style scoped>
  .receipt {
    padding: 1em;  
  }
</style>
