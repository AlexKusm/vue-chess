<template>
  <div class="piece"
       :class="[
           'id-' + piece.id,
           'rank-' + piece.position[1],
            'file-' + piece.position[0],
            {'selected': piece.selected},
            {'beaten': piece.beaten}]"
       @click="piece.possibleBeat ? beat() : startTurn()">
    <img :src="iconPath" width="55" height="55" :alt="piece.type.name">

    <div class="debug">
      <span v-if="debug.attackedTiles" style="font-size: 10px">id: {{ this.id }}</span>
      <span v-if="debug.attackedTiles" style="font-size: 10px">attacked: {{ attackedTiles }}</span>
      <span v-if="debug.moves" style="font-size: 10px;display: block">moves: {{ moves }}</span>
      <span v-if="debug.position" style="font-size: 10px;display: block">y:{{ y }}, x:{{ x }}</span>
      <span v-if="debug.possibleBeat" style="font-size: 10px;display: block">{{ piece.possibleBeat }}</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {getDiagonalMoves, getStraightMoves, getPawnMoves, getKnightMoves, getKingMoves} from "../../store/moves";

export default {
  name: "Piece",
  props: ['piece'],
  data() {
    return {
      debug: {
        id: true,
        attackedTiles: false,
        moves: false,
        position: false,
        possibleBeat: false,
      }
    }
  },
  methods: {
    startTurn() {
      if (this.piece.player !== this.$store.getters.turn) {
        return
      }

      this.$store.dispatch('deselectPieces');
      this.$store.dispatch('selectPiece', this.piece);
      this.$store.dispatch('markPossibleMoves', this.moves);
    },
    updatePieceMoves() {
      this.$store.dispatch('updatePieceMoves', {
        id: this.id,
        moves: this.moves,
        attackedTiles: this.attackedTiles
      })
    },
    beat() {
      const tile = this.$store.getters.tiles[this.y][this.x]
      this.$store.dispatch('commitMove', tile);
    }
  },
  mounted() {
    this.updatePieceMoves()
  },
  computed: {
    ...mapGetters([
      'turn',
      'tiles'
    ]),
    iconPath: function () {
      return require('../../assets/pieces/default/' + this.piece.player + this.piece.type.name + '.svg');
    },
    y: function () {
      return this.piece.position[0];
    },
    x: function () {
      return this.piece.position[1];
    },
    id: function () {
      return this.piece.id;
    },
    attackedTiles: function () {
      switch (this.piece.type.name) {
        case 'Pawn':
          return getPawnMoves(this.y, this.x, this.piece.moved).attackedTiles
        case 'Knight':
          return getKnightMoves(this.y, this.x)
        case 'Bishop':
          return getDiagonalMoves(this.y, this.x)
        case 'Rook':
          return getStraightMoves(this.y, this.x)
        case 'Queen':
          return getStraightMoves(this.y, this.x).concat(getDiagonalMoves(this.y, this.x))
        case 'King':
          return getKingMoves(this.y, this.x)
      }

      return {}

    },
    moves: function () {
      switch (this.piece.type.name) {
        case 'Pawn':
          return getPawnMoves(this.y, this.x, this.piece.moved).moves
        case 'Knight':
          return getKnightMoves(this.y, this.x)
        case 'Bishop':
          return getDiagonalMoves(this.y, this.x)
        case 'Rook':
          return getStraightMoves(this.y, this.x)
        case 'Queen':
          return getStraightMoves(this.y, this.x).concat(getDiagonalMoves(this.y, this.x))
        case 'King':
          return getKingMoves(this.y, this.x)
      }

      return {}
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

.selected {
  transform: translateX(var(--x, 0)) translateY(var(--y, 0)) scale(1.2);
}
</style>
