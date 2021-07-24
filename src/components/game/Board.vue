<template>
  <div class="board" :class="this.turn">
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
  border-radius: 2px;
  box-sizing: border-box;
  display: block;
  flex: 1 0 auto;
  margin: auto;
  max-width: 900px;
  max-height: 900px;
  width: 100%;
  transition: border-color 400ms ease, outline 400ms ease;
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

  &.white {
    border: 10px solid #ddd;
    outline: 2px solid white;
  }

  &.black {
    border: 10px solid #555;
    outline: 2px solid black;
  }
}

.file {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
</style>
