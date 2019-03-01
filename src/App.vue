<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/style/index.scss'
export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  margin: 0 auto;
}
</style>
