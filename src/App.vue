<template>
  <Board/>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  },
  created() {
    this.$store.dispatch('newGame');
  }
}
</script>

<style>

</style>
