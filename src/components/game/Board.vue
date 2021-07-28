<template>
  <div class="board" :class="[this.turn, {'check': this.check}]">
    <div class="file" v-for="(column, i) in tiles" :key="'column-'+ i">
      <Tile :tile="tile" v-for="tile in column" :key="'tile-' + tile.id" ref="tiles"/>
    </div>

    <Piece v-for="piece in pieces" :piece="piece" :key="piece.id"/>

    <div class="beatenPieces black">
      <Piece v-for="piece in blackBeatenPiece" :piece="piece" :key="piece.id" :tiles="tiles"></Piece>
    </div>

    <div class="beatenPieces white">
      <Piece v-for="piece in whiteBeatenPiece" :piece="piece" :key="piece.id" :tiles="tiles"></Piece>
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
  data() {
    return {
      itemRefs: []
    }
  },
  computed: {
    ...mapGetters([
      'turn',
      'tiles',
      'check',
      'pieces',
      'beatenPieces'
    ]),
    blackBeatenPiece: function () {
      return this.beatenPieces.filter(p => p.player === 'black')
    },
    whiteBeatenPiece: function () {
      return this.beatenPieces.filter(p => p.player === 'white')
    }
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
  display: grid;
  flex: 1 0 auto;
  grid-template-columns: repeat(8, 1fr);
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

  &.check {
    outline: 2px solid yellow;
  }
}

.beatenPieces {
  align-items: center;
  display: flex;
  left: 0;
  position: absolute;
  transform: scale(0.7);
  transform-origin: left center;

  &.white {
    top: calc(100% + 12px);
  }

  &.black {
    bottom: calc(100% + 12px);
  }
}
</style>
