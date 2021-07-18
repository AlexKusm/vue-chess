<template>
  <div class="tile"
       :class="[{'color':tile.color}, {'possibleMove':tile.possibleMove}, {'current': tile.current}]"
       :data-file="[tile.y]"
       :data-rank="[tile.x]"
       @click="tile.possibleMove ? commitMove(tile) : console.log('huhu')">
    <span>{{ tile.notation }}</span>
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
  background: lighten(#997766, 15);
}

.tile.color {
  background: #552211;
}

.tile.possibleMove,
.tile.current {
  cursor: pointer;
}

.tile.possibleMove::after {
  background: var(--highlight);
  border: 2px solid white;
  border-radius: 50%;
  content: '';
  cursor: pointer;
  display: block;
  position: absolute;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  width: 50%;
}

.tile.possibleMove.current::after {
  background: var(--highlightBeat);
}

.tile span {
  font-size: clamp(10px, 1.5vw, 16px);
}
</style>
