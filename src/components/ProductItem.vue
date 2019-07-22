<template>
  <v-layout class="item-row">
    <div style="flex-basis: 5%" v-if="showCustomer">{{ item.customer_code }}</div>
    <div style="flex-basis: 15%">{{ item.brand }}</div>
    <div style="flex-basis: 15%">{{ item.number }}</div>
    <div :style="nameStyle">{{ item.name | name_format}}</div>
    <div style="flex-basis: 10%; text-align: right;">{{ item.quantity }}</div>
    <div style="flex-basis: 10%; text-align: right;">{{ item.price_base | price_format}}</div>
    <div style="flex-basis: 10%; text-align: right;">{{ item.discount | price_format }}</div>
    <div style="flex-basis: 10%; text-align: right;">{{ item.price_discount | price_format}}</div>
    <div style="flex-basis: 10%; text-align: right;">{{ total }}</div>
  </v-layout>
</template>

<script>
import { round_number } from '@/helpers'

export default {
  name: 'product-item',
  props: {
    item: {
      type: Object,
      required: true
    },
    showTime: Boolean,
    showCustomer: Boolean
  },
  computed: {
    total () {
      return round_number(this.item.quantity * this.item.price_discount)
    },
    nameStyle () { 
      let width = 20
      if (this.showCustomer) width -= 5
      return {
        flexBasis: width + '%',
        minWidth: 0,
        wordWrap: 'break-word'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-row div {
  padding-right: .5rem;
  border-bottom: solid 1px black;
}
.item-row div:last-child {
  border: 0;
}
</style>





