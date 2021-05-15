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
:root {
  background: whitesmoke;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  background: radial-gradient(#ddd 0%, #abb 100%);
  height: 100vh;
}
</style>
