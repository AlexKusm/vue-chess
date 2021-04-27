<template>
  <div class="piece"
       :class="['rank-' + piece.position[0], 'file-' + piece.position[1], {'selected': piece.selected}]"
       @click="startTurn(piece)">
    <img :src="iconPath" width="40" height="40" :alt="piece.type.name">
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Piece",
  props: ['piece'],
  methods: {
    startTurn() {
      if (this.piece.player !== this.turn) {
        return;
      }

      if (this.piece.selected) {
        this.$store.dispatch('removeMoveHighlight');
        return;
      }

      if (this.piece.type.name === 'Pawn') {
        this.showPawnMoves();
      }

      this.$store.dispatch('startTurn', this.piece)
    },
    showPawnMoves() {
      this.$store.dispatch('showPawnMoves', this.piece);
    }
  },
  computed: {
    ...mapGetters([
      'turn',
      'tiles'
    ]),
    iconPath: function () {
      return require('../assets/pieces/default/' + this.piece.player + this.piece.type.name + '.svg');
    }
  }
}
</script>

<style scoped lang="scss">
.piece {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 5rem;
  justify-content: center;
  position: absolute;
  height: calc(100% / 8);
  left: 0;
  top: 0;
  transform: translateX(var(--x, 0)) translateY(var(--y, 0));
  width: calc(100% / 8);

  @for $i from 0 through 7 {
    &.file-#{$i} {
      --y: calc(700% - 100% * #{$i});
    }

    &.rank-#{$i} {
      --x: calc(100% * (#{$i}));
    }
  }
}

.selected {
  transform: translateX(var(--x, 0)) translateY(var(--y, 0)) scale(1.2) ;
}

</style>
