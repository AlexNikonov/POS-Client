<template>
  <v-layout align-center class="item-row">
    <div style="flex-basis: 10%">{{ item.brand }}</div>
    <div style="flex-basis: 10%">{{ item.number }}</div>
    <div style="flex-basis: 20%; min-width: 0; word-wrap: break-word;">{{ item.name | name_format}}</div>
    <div style="flex-basis: 15%">
      <base-input-number :value="item.quantity" :width="'2rem'" @change="updateQuantity"/>
    </div>
    <div style="flex-basis: 5%">{{ item.price_base }}</div>
    <div style="flex-basis: 15%">
      <base-input-number :value="item.discount" @change="updateDiscount"/>
    </div>
    <div style="flex-basis: 15%">
      <base-input-number :value="item.price_discount" :step="0.1" :width="'4rem'" @change="updatePrice"/>
    </div>
    <div style="flex-basis: 5%">{{ total }}</div>
    <div style="flex-basis: 5%; display: flex;">
      <v-btn style="margin-left: auto;" icon class="hidden-xs-only" @click="removeItem(item)">
        <v-icon>remove_circle_outline</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import { round_number } from '@/helpers'
import BaseInputNumber from '@/components/BaseInputNumber.vue'

export default {
  name: 'cart-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {
    BaseInputNumber
  },
  computed: {
    total () {
      return round_number(this.item.quantity * this.item.price_discount)
    }
  },
  methods: {
    updateQuantity (value) {
      this.$store.dispatch('cart/updateQuantity', { item: this.item, value })
    },
    updatePrice (value) {
      this.$store.dispatch('cart/updatePrice', { item: this.item, value })
    },
    updateDiscount (value) {
      this.$store.dispatch('cart/updateDiscount', { item: this.item, value })
    },
    removeItem () {
      this.$store.dispatch('cart/removeItem', this.item)  
    },
  }
}
</script>

<style scoped lang="scss">
  .item-row {
    border-bottom: 1px solid #000;

    &:last-child {
      border-bottom: none;
    }
  }
</style>

