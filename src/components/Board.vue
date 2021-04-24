<template>
  <div class="board">
    <div class="file" v-for="(column, i) in tiles" :key="'column-'+ i">
        <Tile :tile="tile" v-for="tile in column" :key="'tile-' + tile.id" ref="tiles"/>
    </div>

    <Piece v-for="piece in pieces" :piece="piece" :key="piece.id" :tiles="tiles"/>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Tile from './Tile';
import Piece from './Piece';

export default {
  name: "Board",
  components: {
    Tile,
    Piece
  },
  created() {
    this.$store.dispatch('newGame');
  },
  computed: {
    ...mapGetters([
      'tiles',
      'pieces'
    ])
  }
}
</script>

<style scoped>

.board {
  border: 1px solid darkslategray;
  max-width: 700px;
  margin: auto;
  position: relative;
}

.file {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

</style>
