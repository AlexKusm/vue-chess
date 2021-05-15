<template>
  <div class="tile"
       :class="[{'color':tile.color}, {'possibleMove':tile.possibleMove}, {'possibleBeat':tile.possibleBeat}]"
       :data-rank="[tile.rank]"
       :data-file="[tile.file]"
       @click="tile.possibleMove ? commitMove(tile) : null">
    <span>{{ tile.notation }}</span>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: ['tile'],
  computed: {
    possibleMove: function () {
      return this.tile.possibleMove
    }
  },
  methods: {
    commitMove(tile) {
      this.$store.dispatch('commitMove', tile);
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

.tile.possibleBeat::after {
  background: var(--highlightBeat);
}
</style>
