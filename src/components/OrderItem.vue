<template>
  <v-layout my-3 v-if="item && item.order_products" column class="indigo lighten-5">
    <v-flex lg10 px-2 py-2>
      <v-layout align-content-space-around row nowrap>
        <v-flex lg2>{{ item.id }}</v-flex>
        <v-flex lg2>{{ item.updated_at | moment('LLL') }}</v-flex>
        <v-flex lg2>{{ item.creator }}</v-flex>
        <v-flex>{{ item.status }}</v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg10 px-2 py-2>
      <v-layout row nowrap>
        <v-flex lg2>
          <v-layout column>
            <v-flex>{{ item.client }}</v-flex>
            <v-flex>({{ item.phone_code }}) {{ item.phone }} - {{ item.phone_operator_code }}</v-flex>
            <v-flex>{{ item.comment }}</v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg9>
          <v-layout column>
            <v-flex v-for="row in item.order_products" :key=row.line_id>
              <v-layout row nowrap>
                <v-flex lg1>{{ row.customer_code }}</v-flex>
                <v-flex lg2 pl-1>{{ row.brand }}</v-flex>
                <v-flex lg2 pl-1>{{ row.number }}</v-flex>
                <v-flex lg3 pl-1 caption>{{ row.spec_name }}</v-flex>
                <v-flex lg1 pl-1>{{ row.quantity }}</v-flex>
                <v-flex lg1 pl-1>{{ row.price | price_format }}</v-flex>
                <v-flex lg1 pl-1>{{ row.discount | price_format }}</v-flex>
                <v-flex lg1 pl-1>{{ row.price_discount | price_format }}</v-flex>
                <v-flex lg2 pl-1>{{ row.status }}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg1 align-self-center>
          <router-link :to="{ name: 'order', params: { id: item.id }}">
            <v-btn color="info" fab large>{{ $t('select') }}</v-btn>
          </router-link>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'order-item',
  props: {
    item: {
      type: Object
    }
  }
}
</script>

