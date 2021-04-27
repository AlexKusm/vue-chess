<template>
  <div class="tile"
       :class="[{'color':tile.color}, {'possibleMove':tile.possibleMove}]"
       :data-rank="[tile.rank]"
       :data-file="[tile.file]"
       @click="tile.possibleMove ? move(tile) : null">
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
    move(tile) {
      this.$store.dispatch('move', tile);
    }
  }
}
</script>

<style scoped>
.tile {
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.tile {
  background: sandybrown;
}

.tile.color {
  background: saddlebrown;
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
</style>
