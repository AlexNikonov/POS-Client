<template>
<div>
  <v-toolbar color="pink" dark>
    <v-toolbar-title>{{ $t('cart') }}</v-toolbar-title>
  </v-toolbar>
  <v-list ref="miniCart" two-line>
    <template v-for="(item, index) in items">
      <v-list-tile ripple :key="item.id">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.brand }}&nbsp;&nbsp;{{ item.number }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.name }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          {{ item.quantity }} * {{ item.price_discount | price_format }}
        </v-list-tile-avatar>
      </v-list-tile>
      <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
    </template>
    <v-list dense subheader>
        <v-subheader>Сумма итого:</v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <p class="headline font-weight-black">{{ total }}</p>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> 
      <v-list-tile :to="{ name: 'cart' }">
        <v-list-tile-action>
          <v-icon color="pink">edit</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title color="pink">{{ $t('edit') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> 
  </v-list>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'mini-cart',
  computed: {
    ...mapGetters('cart', ['items', 'total'])
  },
  watch: {
    items () {
      this.scrollToEnd()  
    }
  },
  methods: {
    scrollToEnd () {    	
      var container = this.$refs.miniCart
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style scoped>

</style>
