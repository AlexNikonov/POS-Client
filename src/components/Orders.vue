<template>
  <v-layout column>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs4 mr-3>
          <v-text-field
            outline
            label="Номер запчасти"
            append-icon="search"
            class="lg-2 white--text"
            clearable
            @click:append="search_by_substring($event)"
            @change="search_by_substring($event)"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 mx-3>
          <v-text-field
            outline
            label="Номер телефона"
            append-icon="search"
            class="lg-2 white--text"
            clearable
            @click:append="search_by_phone_number($event)"
            @change="search_by_phone_number($event)"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 ml-3>
          <v-select
            outline
            :label="$t('date_range.label')"
            :items="$t('date_range.items')"
            v-model="current_date_range"
            @change="show_by_date_range($event)"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Orders',
  data () {
    return {
      current_date_range: 'last_week'
    }
  },
  methods: {
    search_by_substring(substring) {
      this.$router.push({
        name: 'orders-list-by-substring',
        params: { substring }
      })
    },
    search_by_phone_number(phone_number) {
      this.$router.push({
        name: 'orders-list-by-phone-number',
        params: { phone_number }
      })
    },
    show_by_date_range(date_range) {
      this.$router.push({
        name: 'orders-date-range',
        params: { date_range }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.current_date_range = to.params.date_range
    next()
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

