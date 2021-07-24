<template>
  <div class="tile"
       :class="[{'color':tile.color}, {'possibleMove':tile.possibleMove}, {'current': tile.current}]"
       :data-file="[tile.y]"
       :data-rank="[tile.x]"
       @click="tile.possibleMove === true ? commitMove(tile) : deselect()">
    <span>{{ tile.y }}, {{tile.x}}</span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Tile",
  props: ['tile'],
  computed: {
    ...mapGetters([
      'turn'
    ]),
    possibleMove: function () {
      return this.tile.possibleMove
    },
    current: function () {
      return this.tile.current
    }
  },
  methods: {
    commitMove(tile) {
      this.$store.dispatch('commitMove', tile);
      this.$emit('commitMove')
    },
    deselect() {
      this.$store.dispatch('deselectPieces');
    }
  }
}
</script>

<style scoped lang="scss">
.tile {
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.tile {
  background: darken(white, 15);
}

.tile.color {
  background: lightslategray;
}

.tile.possibleMove,
.tile.current {
  cursor: pointer;
}

.tile.possibleMove::after {
  background: var(--highlight);
  border: 5px solid white;
  content: '';
  cursor: pointer;
  display: block;
  position: absolute;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  width: 80%;
}

.tile.possibleMove.current::after {
  background: var(--highlightBeat);
}

.tile span {
  font-size: clamp(10px, 1.5vw, 16px);
  z-index: 90;
}
</style>
