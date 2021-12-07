<template>
  <div class="pieceModal">
    <Piece v-for="piece in pieceTypes" :piece="piece" :key="piece.id"/>
  </div>
</template>
<script>
import Piece from "./Piece";
import {mapGetters} from "vuex";
import {startingPositions} from "../../store/helpers/helpers";

export default {
  components: {Piece},
  computed: {
    ...mapGetters([
      'pieces',
      'turn'
    ]),
    pieceTypes: function () {
      var pieceMap = startingPositions().map(item => {
        return [item.type, item]
      })

      var maparr = new Map(pieceMap);
      let pieceTypes = [...maparr.values()]

      let currentPieceTypes = [];

      pieceTypes.forEach(p => {
        p.id = 0;
        p.player = this.turn;
        currentPieceTypes.push(p);
      })

      currentPieceTypes = currentPieceTypes.filter(p => {
        return !(p.type.name === 'King' || p.type.name === 'Pawn');
      })

      return currentPieceTypes
    }
  }
}
</script>

<style lang="scss">
.pieceModal {
  align-items: center;
  background: radial-gradient(#222, #444);
  border: 2px solid black;
  justify-content: center;
  height: 130px;
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  flex-wrap: wrap;
  width: 130px;
  z-index: 999;

  .piece {
    display: flex;
  }

  .black & {
    background: radial-gradient(#eee, #aaa);
    border: 2px solid white;
  }

  > * {
    flex-basis: 50%;
  }
}
</style>
