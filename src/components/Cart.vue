<template>
  <v-layout column align-space-between>
    <v-flex xs12>
      <product-item-editable showRemoveButton v-for="item in items" 
        :key = "item.id"
        :item = "item"
        @update-quantity = "updateQuantity"
        @update-price = "updatePrice"
        @update-discount = "updateDiscount"
        @remove-item = "removeItem"
      />
    </v-flex>
    <v-flex>
      <v-layout item row nowrap py-2>
        <v-flex xs2 offset-xs8 pl-4  title>
          <p class="text-xs-center">{{ total }} руб.</p>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
      <v-btn @click="clear">Очистить</v-btn>
      <v-btn @click="print">Печать</v-btn>
      <v-btn @click="save">Сохранить</v-btn>
    </v-flex>
    <div id="print-layout" ref="print-layout" v-if="printLayoutVisibility">
      магазин "Автомаркет"
      <br>
      ООО "Авто-НАСА"
      <br>
      г. Минск, ул. Бельского, 71
      <br>
      <p class="title"><b>К О П И Я&nbsp;&nbsp;&nbsp;Ч Е К А</b></p>
      <div v-for="item in items" :key="item.id">
        <div class="print-item">
          <span class="print-item-name">{{ item.brand}} {{ item.number }} {{ item.name | short_name_format}}</span>
          <span class="print-item-price">{{ item.price_discount | price_format }}</span>
          <span class="print-item-quantity">{{ item.quantity }}</span>
          <span class="print-item-total">{{ (item.quantity * item.price_discount) | price_format }}</span>
        </div>
      </div>
      <p class="total">ИТОГО:&nbsp;&nbsp;{{ total }}&nbsp;руб</p>
    </div>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { Printd } from 'printd'
import ProductItemEditable from '@/components/ProductItemEditable.vue'

export default {
  name: 'cart',
  data () {
    return {
      printLayoutVisibility: false
    }
  },
  computed: {
    ...mapGetters('cart', ['items', 'total'])
  },
  components: {
    ProductItemEditable
  },
  methods: {
    updateQuantity (item, value) {
      this.$store.dispatch('cart/updateQuantity', { item, value })
    },
    updatePrice (item, value) {
      this.$store.dispatch('cart/updatePrice', { item, value })
    },
    updateDiscount (item, value) {
      this.$store.dispatch('cart/updateDiscount', { item, value })
    },
    removeItem (item) {
      this.$store.dispatch('cart/removeItem', item)  
    },
    clear () {
      this.$store.dispatch('cart/clearCart')  
    },
    async print() {
      this.printLayoutVisibility = true
      await this.$nextTick()
      let printElement = document.getElementById("#print-layout");
      var printWindow = window.open('', 'PRINT');
      printWindow.document.write(document.documentElement.innerHTML);
      setTimeout(() => { // Needed for large documents
        printWindow.document.body.style.margin = '0 0';
        printWindow.document.body.innerHTML = printElement.outerHTML;
        printWindow.document.close(); // necessary for IE >= 10
        printWindow.focus(); // necessary for IE >= 10*/
        printWindow.print();
        printWindow.close();
      }, 1000)
      this.printLayoutVisibility = false
    }, 
    async printOld () {
      const d = new Printd()
      const cssText = `
        span {
          margin-right: 10px;
        }
        .title {
          text-align: center;
          font-size: 10px;
        }
        .print-item {
          padding-bottom: 8px;
          font-size: 7px;
          border-bottom: 1px dotted #767a82;
        }
        .print-item :last-child {
          border: 0;
        }
        .print-item-name {

        }
        .print-item-quantity {

          text-align: right;
        }
        .print-item-price {

          text-align: right;
        }
        .print-item-total {

          text-align: right;
        }
        .total {
          text-align: right;
          font-weight: bold;
          font-size: 24px;
        }
        #print-layout ul {
          margin-left: 60px;
        }
      }
      `
      this.printLayoutVisibility = true
      await this.$nextTick()
      d.print(document.getElementById('print-layout'), cssText)
      this.printLayoutVisibility = false
    },
    save () {
      this.$store.dispatch('cart/saveCart')
    }
  }
}
</script>

<style scoped lang="scss">

  #print-layout {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }

  #pprint-layout {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
  }
  #styled-input {
    height: 40px;
    font-size: 8pt;
  }
  .styled-input label[for] {
    height: 40px;
    font-size: 8pt;
  }
</style>
