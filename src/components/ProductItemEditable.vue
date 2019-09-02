<template>
  <v-layout align-center class="item-row">
    <div style="flex: 0 1 5%" v-if="showCustomer">{{ item.customer_code }}</div>
    <div style="flex: 0 1 10%">{{ item.brand }}</div>
    <div style="flex: 0 1 10%">{{ item.number }}</div>
    <div style="flex: 0 1 20%; padding-right: 1rem;">{{ item.name | name_format}}</div>
    <div style="flex: 0 1 15%">
      <base-input-number v-if="editable" :value="item.quantity" :width="'2rem'" @change="updateQuantity"/>
      <span v-else>{{ item.quantity }}</span>
    </div>
    <div style="flex: 0 1 5%">{{ item.price_base | price_format}}</div>
    <div style="flex: 0 1 15%">
      <base-input-number v-if="editable" :value="item.discount" @change="updateDiscount"/>
      <span v-else>{{ item.discount | price_format}}</span>
    </div>
    <div style="flex: 0 1 15%">
      <base-input-number v-if="editable" :value="item.price_discount" :step="0.1" :width="'4rem'" @change="updatePrice"/>
      <span v-else>{{ item.price_discount | price_format}}</span>
    </div>
    <div style="flex: 0 1 5%">{{ total }}</div>
    <button v-if="editable && showRemoveButton" icon @click="removeItem(item)">
      <v-icon>remove_circle_outline</v-icon>
    </button>
    <button v-if="editable && showAddButton" icon @click="addItem(item)">
      <v-icon>send_outline</v-icon>
    </button>
  </v-layout>
</template>

<script>
import { round_number } from '@/helpers'
import BaseInputNumber from '@/components/BaseInputNumber.vue'

export default {
  name: 'product-item-editable',
  data () {
    return {
      item: this.data
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    },
    showCustomer: Boolean,
    showAddButton: Boolean,
    showRemoveButton: Boolean
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
      this.$emit('update-quantity', this.item, value)
    },
    updatePrice (value) {
      this.$emit('update-price', this.item, value)
    },
    updateDiscount (value) {
      this.$emit('update-discount', this.item, value)
    },
    removeItem () {
      this.$emit('remove-item', this.item)  
    },
    addItem () {
      this.$emit('add-item', this.item)  
    }
  }
}
</script>

<style scoped lang="scss">
  button {
    margin: 0 1rem;
    width: 1em;
  }
  .item-row {
    border-bottom: 1px solid #000;
    margin: 1rem 0;

    &:last-child {
      border-bottom: none;
    }
  }
</style>