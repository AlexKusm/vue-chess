<template>
  <Game/>
</template>

<script>
import Game from './components/game/Game.vue'

export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style lang="scss">
@import 'src/sass/variables.scss';

:root {
  background: whitesmoke;
  font-size: (100% / 16) * 10; //1rem = 10px
}

body {
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
}

#app {
  background: radial-gradient(#666 0%, #444 100%);
  height: 100vh;
}
</style>
