<template>
  <div class="game">
    <div class="turn">Turn: <span>{{turn}}</span></div>
    <div class="board">
      <div class="file" v-for="(column, i) in tiles" :key="'column-'+ i">
        <Tile :tile="tile" v-for="tile in column" :key="'tile-' + tile.id" ref="tiles"/>
      </div>

      <Piece v-for="piece in pieces" :piece="piece" :key="piece.id" :tiles="tiles"/>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Tile from './Tile';
import Piece from './Piece';

export default {
  name: "Board",
  components: {
    Tile,
    Piece
  },
  computed: {
    ...mapGetters([
      'turn',
      'tiles',
      'pieces'
    ])
  }
}
</script>

<style scoped lang="scss">

.board {
  border: 1px solid darkslategray;
  max-width: 700px;
  margin: auto;
  position: relative;
}

.file {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.turn span {
  text-transform: capitalize;
}

</style>
