<template>
  <v-layout my-3 v-if="item && item.products" column class="indigo lighten-5">
    <v-flex lg10 px-2 py-2>
      <v-layout align-content-space-around row nowrap>
        <v-flex lg2>{{ item.id }}</v-flex>
        <v-flex lg2>{{ item.updated_at | moment('LLL') }}</v-flex>
        <v-flex lg2>{{ item.user }}</v-flex>
        <v-flex>{{ item.status }}</v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg10 px-2 py-2>
      <v-layout row nowrap>
        <v-flex lg2>
          <v-layout column>
            <v-flex>{{ item.client }}</v-flex>
            <v-flex>
              <span v-if="item.phone_code && item.phone">({{ item.phone_code }}) </span>
              <span v-if="item.phone">{{ item.phone }}</span>
              <span v-if="item.phone_operator_code != 0 && item.phone"> - {{ item.phone_operator_code }}</span>
            </v-flex>
            <v-flex>{{ item.comment }}</v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg9>
          <v-layout column>
            <v-flex v-for="row in item.products" :key="row.order_id + '#' + row.line_id">
              <v-layout row nowrap>
                <v-flex lg1>{{ row.customer_code }}</v-flex>
                <v-flex lg9><product-item-editable :item = row /></v-flex>
                <v-flex lg2 pl-1>{{ row.status }}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg1 align-self-center>
          <router-link :to="{ name: 'order-edit', params: { id: item.id }}">
            <v-btn color="info" fab large>{{ $t('select') }}</v-btn>
          </router-link>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductItemEditable from '@/components/ProductItemEditable.vue'

export default {
  name: 'order-item',
  props: {
    item: {
      type: Object
    }
  },
  components: {
    ProductItemEditable
  }
}
</script>

