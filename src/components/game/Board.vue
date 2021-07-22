<template>
  <div class="board">
    <div class="file" v-for="(column, i) in tiles" :key="'column-'+ i">
      <Tile @commitMove="updatePieceMoves" :tile="tile" v-for="tile in column" :key="'tile-' + tile.id" ref="tiles"/>
    </div>

    <Piece v-for="piece in pieces" :piece="piece" :key="piece.id" :tiles="tiles" :ref="pieceRef"/>
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
  data() {
    return {
      itemRefs: []
    }
  },
  methods: {
    pieceRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    updatePieceMoves() {
      this.itemRefs.forEach(piece => piece.updatePieceMoves())
    }
  },
  computed: {
    ...mapGetters([
      'turn',
      'tiles',
      'pieces',
      'beatenPieces',
      'attackedTiles'
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
  border: 10px solid darken(saddlebrown, 5);
  border-radius: 10px;
  max-width: 700px;
  margin: auto;
  margin-top: 2rem;
  position: relative;

  &::before {
    background: url('../../assets/wood.jpg');
    content: '';
    height: 100%;
    opacity: 0.4;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
}

.file {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
</style>
