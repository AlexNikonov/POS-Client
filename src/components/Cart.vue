<template>
<div>
  <div id="print-layout" ref="printed">
      <div class="customer">магазин "Автомаркет"</div>
      <p>ООО "Авто-НАСА"</p>
      <p>УНП: 190988158</p>
      <p>г. Минск, ул. Бельского,71</p>
      <p>avto-market.by</p>
      <p class="title">КОПИЯ ЧЕКА</p>
      <div v-for="item in items" :key="item.id" class="print-item">
        <div class="print-item-name">{{ item.brand}} {{ item.number }} {{ item.name | short_name_format}}</div>
        <div class="print-item-price">{{ item.price_discount | price_format }}</div>
        <div class="print-item-quantity">{{ item.quantity }}</div>
        <div class="print-item-total">{{ (item.quantity * item.price_discount) | price_format }}</div>
      </div>
      <div class="total">
        <span>ИТОГ</span>
        <span>{{ total }}</span>
      </div>
      <div class="time">
        <span>{{ Date.now() | moment('L') }}</span>
        <span>{{ $d(Date.now(), 'time') }}</span>
      </div>
  </div>
  <v-layout column align-space-between>
    <v-flex xs12>
      <v-layout align-center class="table-header">
        <div style="flex: 0 1 10%">Производитель</div>
        <div style="flex: 0 1 10%">Номер</div>
        <div style="flex: 0 1 20%; padding-right: 1rem;">Наименование</div>
        <div style="flex: 0 1 15%">Кол-во</div>
        <div style="flex: 0 1 5%">Цена</div>
        <div style="flex: 0 1 15%">Скидка</div>
        <div style="flex: 0 1 15%">Цена со скидкой</div>
        <div style="flex: 0 1 5%">Всего</div>
      </v-layout>
      <product-item-editable showRemoveButton v-for="item in items" 
        :key = "item.id"
        :data = "item"
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
  </v-layout>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItemEditable from '@/components/ProductItemEditable.vue'

export default {
  name: 'cart',
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
      const cssText = `
        body {
          font-family: Lucida Console;
          font-size: 14px;
          margin: 0;
        }
        p {
          font-size: 11px;
          margin: 0 0 4px 0;
        }
        .customer {
          font-size: 15px;
          font-weight: bold;
          text-align: center;
          padding: 8px;
          margin: 6px auto;
        }
        .title {
          margin: 16px;
          text-align: center;
          font-size: 15px;
        }
        .print-item {
          margin: 0;
          padding: 8px 0;
          font-size: 10px;
          border-bottom: 1px dotted black;
          display: flex;
        }
        .print-item-name {
          flex: 0 1 65%;
        }
        .print-item-quantity {
          flex: 0 1 5%;
          padding-left: 4px;
          text-align: right;
        }
        .print-item-price {
          flex: 0 1 15%;
          padding-left: 4px;
          text-align: right;
        }
        .print-item-total {
          flex: 0 1 15%;
          padding-left: 4px;
          text-align: right;
        }
        .total {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          font-size: 14px;
          margin: 8px 0;
          padding-bottom: 4px;
          border-bottom: 1px dotted black;
        }
        .time {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-style: italic;
          margin: 8px 0;
        }
        @page {
          margin-top: 0.5cm;
          margin-bottom: 1cm;
          margin-left: 1.5cm;
          margin-right: 1.5cm;
        }
      }
      `
      var iframe = window.document.createElement('iframe');
      var css = 'visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;';
      iframe.setAttribute('src', 'about:blank');
      iframe.setAttribute('style', css);
      iframe.setAttribute('width', '0');
      iframe.setAttribute('height', '0');
      iframe.setAttribute('wmode', 'opaque');
      window.document.body.appendChild(iframe);
      
      var copy = this.$refs.printed.cloneNode(true)
      //var elStyle = window.getComputedStyle(this.$refs.printed).cssText
      var cw = iframe.contentWindow
      var doc = cw.document
      doc.open()
      doc.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>')
      var style = doc.createElement('style');
      style.type = 'text/css';
      //style.appendChild(window.document.createTextNode(elStyle));
      style.appendChild(window.document.createTextNode(cssText))
      doc.addEventListener('load', () => {

      }, false)
      doc.head.appendChild(style)
      doc.body.appendChild(copy)
      doc.execCommand('print', false, null)
      doc.close()
    },
    save () {
      this.$store.dispatch('cart/saveCart')
    }
  }
}
</script>

<style>
  #print-layout {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 12px;
  }

  .table-header {
    font-weight: bold;
  }
</style>
