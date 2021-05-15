<template>
  <div class="game">
    <Moves/>
    <Player :color="'black'"/>
    <Board/>
    <Player :color="'white'"/>
  </div>
</template>

<script>
import Board from "@/components/game/Board";
import Player from "@/components/game/Player";
import Moves from "@/components/game/Notation";

export default {
  name: "Game",
  components: {
    Board, Player, Moves
  },
  created() {
    this.$store.dispatch('newGame');
  }
}
</script>

<style scoped>

</style>
