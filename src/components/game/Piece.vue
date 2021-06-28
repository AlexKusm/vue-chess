<template>
  <div class="piece"
       :class="[
           'id-' + piece.id,
           'rank-' + piece.position[1],
            'file-' + piece.position[0],
            {'selected': piece.selected},
            {'beaten': piece.beaten}]">
    <img :src="iconPath" width="40" height="40" :alt="piece.type.name">
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Piece",
  props: ['piece'],
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
    }
  }
}
</script>

<style scoped lang="scss">
.piece {
  pointer-events: none;
  z-index: 3;

  img {
    max-height: 40%;
  }
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
