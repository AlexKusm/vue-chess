<template>
  <div class="game">
    <div class="turn">Turn: <span>{{turn}}</span></div>
    <div class="moves">Moves: <span class="move" v-for="move in moves" :key="move.id">{{move.id}}.{{move.notation}}</span></div>
    <div class="board">
      <div class="file" v-for="(column, i) in tiles" :key="'column-'+ i">
        <Tile :tile="tile" v-for="tile in column" :key="'tile-' + tile.id" ref="tiles"/>
      </div>

      <Piece v-for="piece in pieces" :piece="piece" :key="piece.id" :tiles="tiles"/>
    </div>

    <Piece v-for="piece in beatenPieces" :piece="piece" :key="piece.id" :tiles="tiles"/>
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
      'moves',
      'pieces',
      'beatenPieces'
    ])
  }
}
</script>

<style lang="scss">
:root {
  --highlight: green;
  --highlightBeat: red;
}

*::selection {
  background: none;
}

.board {
  border: 1px solid darkslategray;
  max-width: 700px;
  margin: auto;
  margin-top: 2rem;
  position: relative;
}

.file {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.move {
  display: inline-block;
  padding: 2px;
}

.turn span {
  text-transform: capitalize;
}

</style>
