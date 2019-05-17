<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      extended
      v-model="drawer"
      app>
      <cart-mini />
    </v-navigation-drawer>
    <v-toolbar class="primary" dark fixed app>
      <v-btn icon @click="drawer = !drawer">
        <v-icon pr-2>assignment</v-icon>
      </v-btn>
      <v-toolbar-items>
        <v-btn flat :to="{ name: 'home' }" exact>{{ $t('home') }}</v-btn>
        <v-btn flat :to="{ name: 'search' }">{{ $t('search') }}</v-btn>
        <v-btn flat :to="{ name: 'cart' }">{{ $t('cart') }}</v-btn>
        <v-btn flat :to="{ name: 'receipts' }">{{ $t('receipts_list') }}</v-btn>
        <v-btn flat :to="{ name: 'orders' }">{{ $t('orders') }}</v-btn>
        <v-btn flat :to="{ name: 'service' }">{{ $t('service') }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import CartMini from '@/components/CartMini.vue'

export default {
  name: 'App',
  data () {
    return {
      drawer: null
    }
  },
  components: {
    CartMini
  }
}
</script>
