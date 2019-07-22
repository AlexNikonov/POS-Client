<template>
    <v-dialog v-model="isOpen" persistent width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавить в чек</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout column>
              <v-flex>
                <v-layout row pb-3>
                  <v-flex xs4>Наименование:</v-flex>
                  <v-flex xs8>{{ item.name }}</v-flex>
                </v-layout>
              </v-flex>
              <v-flex>
                <v-layout row align-center>
                  <v-flex xs4>Цена:</v-flex>
                  <v-flex xs3>
                    <v-text-field
                      type=number
                      :value="item.price_discount"
                      @change="updatePrice($event)"
                      append-outer-icon="add"
                      @click:append-outer="incrementPrice()"
                      prepend-icon="remove"
                      @click:prepend="decrementPrice()">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex>
                <v-layout row align-center>
                  <v-flex xs4>Количество:</v-flex>
                  <v-flex xs3>
                    <v-text-field
                      mask="##"
                      :value="item.quantity"
                      @input="updateQuantity($event)"
                      append-outer-icon="add"
                      @click:append-outer="incrementQuantity()"
                      prepend-icon="remove"
                      @click:prepend="decrementQuantity()">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn large color="error" @click="isOpen = false">Отмена</v-btn>
          <v-spacer></v-spacer>
          <v-btn large color="success" @click="add_to_cart()">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'product-add-details-modal',
  data () {
    return {
      item: {},
      isOpen: false
    }
  },
  methods: {
    open (item) {
      this.item = { ...item }
      this.isOpen = true
    },
    add_to_cart() {
      this.$store.dispatch('cart/addItem', this.item)
      this.isOpen = false
    },
    incrementQuantity () {
      this.item.quantity++
    },
    decrementQuantity () {
      if (this.item.quantity > 2) this.item.quantity--
    },
    updateQuantity (value) {
      this.item.quantity = value
    },
    incrementPrice () {
      this.item.price += 0.1
    },
    decrementPrice () {
      if (this.item.quantity > 0.1) this.item.price -= 0.1
    },
    updatePrice (value) {
      this.item.price = value
    }
  }
}
</script>
