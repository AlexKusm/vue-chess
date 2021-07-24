<template>
  <div class="game">
    <Moves/>
    <p class="check">{{ check }}</p>
    <div class="beatenPieces black"><Piece v-for="piece in blackBeatenPiece" :piece="piece" :key="piece.id" :tiles="tiles"></Piece></div>
    <Board/>
    <div class="beatenPieces white"><Piece v-for="piece in whiteBeatenPiece" :piece="piece" :key="piece.id" :tiles="tiles"></Piece></div>
  </div>
</template>

<script>
import Board from "@/components/game/Board";
import Moves from "@/components/game/Notation";
import {mapGetters} from "vuex";
import Piece from "./Piece";

export default {
  name: "Game",
  components: {
    Piece,
    Board,
    Moves
  },
  created() {
    this.$store.dispatch('newGame');
  },
  computed: {
    ...mapGetters([
      'check',
      'beatenPieces',
      'tiles'
    ]),
    blackBeatenPiece: function () {
      console.log(this.beatenPieces);
      return this.beatenPieces.filter(p => p.player === 'black')
    },
    whiteBeatenPiece: function () {
      return this.beatenPieces.filter(p => p.player === 'white')
    }
  }
}
</script>

<style scoped>
.game {
  box-sizing: border-box;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.check {
  position: fixed;
  top: 50px;
  left: 50px;
}
</style>
