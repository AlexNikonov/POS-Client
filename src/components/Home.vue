<template>
  <v-layout justify-center align-center column>
    <v-btn large flat color="info" :to="{ name: 'search' }">{{ $t('search') }}</v-btn>
    <v-btn large flat color="info" :to="{ name: 'orders' }">{{ $t('orders') }}</v-btn>
  </v-layout> 
</template>

<script>
export default {
  name: 'home'
}
</script>

