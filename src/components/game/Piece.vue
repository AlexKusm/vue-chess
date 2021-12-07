<template>
  <div class="piece"
       :class="[
           'id-' + piece.id,
           'rank-' + piece.x,
           'file-' + piece.y,
           'x-' + piece.x,
           'y-' + piece.y,
            {'selected': piece.selected},
            {'beaten': piece.beaten}]"
       @click="piece.possibleBeat ? beat() : startTurn()">
    <img :src="iconPath" width="55" height="55" :alt="piece.type.name">

    <div class="debug">
      <span v-if="debug.id" style="font-size: 10px">id: {{ id }}</span>
      <span v-if="debug.position" style="font-size: 10px;display: block">y:{{ y }}, x:{{ x }}</span>
      <span v-if="debug.possibleBeat" style="font-size: 10px;display: block">{{ piece.possibleBeat }}</span>
      <span v-if="debug.attackedTiles" style="font-size: 10px;display: block">{{ attackedTiles }}</span>
      <span v-if="debug.moves" style="font-size: 10px;display: block">{{ moves }}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "Piece",
  props: ['piece'],
  data() {
    return {
      debug: {
        attackedTiles: false,
        moves: false,
        id: false,
        position: false,
        possibleBeat: false
      }
    }
  },
  methods: {
    ...mapMutations([

    ]),
    startTurn() {
      if (this.piece.player !== this.$store.getters.turn || this.piece.id === 0) {
        return
      }

      this.$store.dispatch('deselectPieces');
      this.$store.dispatch('selectPiece', this.piece);
      this.$store.dispatch('markPossibleMoves', this.piece.moves);
    },
    beat() {
      const tile = this.$store.getters.tiles[this.piece.x][this.piece.y]
      this.$store.dispatch('commitMove', tile);
    }
  },
  computed: {
    ...mapGetters([
      'turn',
      'tiles'
    ]),
    iconPath: function () {
      return require('../../assets/pieces/second/' + this.piece.player + this.piece.type.name + '.svg');
    },
    id: function () {
      return this.piece.id;
    },
    moves: function () {
      let piece = this.$store.getters.pieces.find(p => p.id === this.piece.id)
      if (piece) {
        return piece.attackedTiles;
      } else {
        return undefined
      }
    },
    attackedTiles: function () {
      let piece = this.$store.getters.pieces.find(p => p.id === this.piece.id)

      if (piece) {
        return piece.moves;
      } else {
        return undefined
      }
    }
  }
}

</script>

<style scoped lang="scss">
.piece {
  z-index: 3;

  img {
    max-height: 60%;
  }
}

.piece.selected {
  background: transparentize(#ffff00, 0.7);
}

.board {
  .piece:not(.beaten) {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: 5rem;
    justify-content: center;
    position: absolute;
    height: calc(100% / 8);
    left: 0;
    top: 0;
    transition: transform 70ms linear;
    transform: translateX(var(--x, 0)) translateY(var(--y, 0));
    width: calc(100% / 8);

    @for $i from 0 through 7 {
      &.file-#{$i} {
        --y: calc(100% * #{$i});
      }

      &.rank-#{$i} {
        --x: calc(100% * (#{$i}));
      }
    }
  }
}

.selected {
  transform: translateX(var(--x, 0)) translateY(var(--y, 0)) scale(1.2);
}
</style>
