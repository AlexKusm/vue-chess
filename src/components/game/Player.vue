<template>
  <div class="player">
    Player {{ color }}
    <Piece v-for="piece in playersBeatenPiece" :piece="piece" :key="piece.id"/>
  </div>
</template>

<script>
import Piece from "@/components/game/Piece";
import {mapGetters} from "vuex";

export default {
  name: "Player",
  props: ['color'],
  components: {Piece},
  computed: {
    ...mapGetters([
      'beatenPieces'
    ]),
    playersBeatenPiece: function () {
      return this.beatenPieces.filter(p => p.player === this.color)
    }
  }
}
</script>

<style scoped lang="scss">
.player {
  .piece {
    position: absolute;
  }
}
</style>
