<template>
<v-toolbar class="primary" dark fixed app>
  <v-btn icon @click="drawer = !drawer">
    <v-icon pr-2>assignment</v-icon>
  </v-btn>
  <v-toolbar-items>
    <v-btn flat :to="{ name: 'home' }" exact>{{ $t('home') }}</v-btn>
    <v-btn flat :to="{ name: 'search' }" exact>{{ $t('search') }}</v-btn>
    <v-btn flat :to="{ name: 'cart' }" exact>{{ $t('cart') }}</v-btn>
    <v-btn flat :to="{ name: 'receipts' }" exact>{{ $t('receipts_list') }}</v-btn>
    <v-btn flat :to="{ name: 'orders' }" exact>{{ $t('orders') }}</v-btn>
    <v-btn flat :to="{ name: 'service' }" exact>{{ $t('service') }}</v-btn>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>
