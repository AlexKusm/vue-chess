<template>
  <div class="game">
    <Moves/>

    <p class="check">{{ check }}</p>

    <Board/>
  </div>
</template>

<script>
import Board from "@/components/game/Board";
import Moves from "@/components/game/Notation";
import {mapGetters} from "vuex";

export default {
  name: "Game",
  components: {
    Board,
    Moves
  },
  created() {
    this.$store.dispatch('newGame');
  },
  computed: {
    ...mapGetters([
      'check',
      'moveHistory',
    ])
  }
}
</script>

<style lang="scss">
.game {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  width: 100vw;
}

p.check {
  position: fixed;
  top: 50px;
  left: 50px;
}
</style>
