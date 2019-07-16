<template>
    <div class="input">
      <button tabindex="-1" @click="decrement">&mdash;</button>
      <input type="number" min="0" :style="{ 'width': width }" @change="change" v-model="currentValue" />
      <button tabindex="-1" @click="increment">&#xff0b;</button>
    </div>
</template>

<script>

export default {
  name: 'BaseInputNumber',
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '3rem'
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (new_value) {
      this.currentValue = new_value
    }
  },
  methods: {
    increment () {
      this.currentValue += this.step
      this.change()
    },
    decrement () {
      if(this.currentValue > this.step ) {
        this.currentValue -= this.step
        this.change()
      }
    },
    change () {
      this.$emit("change", this.currentValue, 22)
    }
  }
}
</script>

<style lang="scss" scoped>

  $border: 2px solid #ddd;
  
  .input {
    display: flex;
    
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }

    input {
      border: 0;
      border-top: $border;
      border-bottom: $border;
      text-align: center;
      padding: 0 .5rem;
      
      &:focus {
        border-color: #0074d9;
        outline: none;
      }
    }
    
    button {
      border: $border;
      padding: .5rem;
      background: #f5f5f5;
      color: #888;
      font-size: 1rem;
      cursor: pointer;
    }
  }
</style>

