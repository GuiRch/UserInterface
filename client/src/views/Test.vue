<template>
  <div>
    <basic-counter
      :counter="counter"
      @increment="onIncrement"
      @decrement="onDecrement"
    />
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      counter: 0
    }
  },

  methods: {
    onDecrement () {
      this.counter--
    },
    onIncrement () {
      this.counter++
    }
  }
}
</script>
