<template>
  <div class="tile" :class="[{'color':tile.color}]"
       ref="tile"
       :data-rank="[tile.rank]"
       :data-file="[tile.file]">
    <span>{{ tilename }}</span>
  </div>
</template>

<script>
import translateRanks from '../store/helpers';

export default {
  name: "Board",
  props: ['tile'],
  computed: {
    tilename: function () {
      return translateRanks(this.tile.rank) + '' + this.tile.file;
    }
  }
}
</script>

<style scoped>
.tile {
  height: 0;
  padding-bottom: 100%;
}

.tile {
  background: sandybrown;
}

.tile.color {
  background: saddlebrown;
}
</style>
