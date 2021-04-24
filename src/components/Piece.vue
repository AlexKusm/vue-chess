<template>
  <div class="piece" :class="['rank-' + piece.position[0], 'file-' + piece.position[1]]"
       @click="startTurn()">
    <img :src="iconPath" width="40" height="40">
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

      this.$store.dispatch('startTurn', this.piece)
    }
  },
  computed: {
    ...mapGetters([
      'turn'
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
  display: flex;
  font-size: 5rem;
  justify-content: center;
  position: absolute;
  height: calc(100% / 8);
  left: 0;
  top: 0;
  transform:
      translateX(var(--x, 0))
      translateY(var(--y, 0));
  width: calc(100% / 8);

  @for $i from 1 through 8 {
    &.file-#{$i} {
      --y: calc(800% - 100% * #{$i});
    }

    &.rank-#{$i} {
      --x: calc(100% * (#{$i} - 1));
    }
  }
}

</style>
