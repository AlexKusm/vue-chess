<template>
    <ul class="moveHistory">
      <li v-for="move in moveHistory" :key="move.id">
        {{move.id}}. {{ move.notation }}
      </li>
    </ul>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "notation",
  computed: {
    ...mapGetters([
      'moveHistory'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import 'src/sass/utilities';

  .moveHistory {
    @include spacing-content($direction: horizontal, $margin: var(--spacing--small));

    align-items: center;
    background: linear-gradient(to right, #ddd 0%, #bbb 100%);
    display: flex;
    position: fixed;
    list-style: none;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    width: 100vw;
  }
</style>
