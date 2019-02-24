<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
body {
  margin: 0;
  padding: 0;
  background: #fff;
  color:#333;
  font-size: 13px;
}
.gray {
  color: #999;
}
.f12 {
  font-size: 12px;
}
.f14 {
  font-size: 14px;
}
.f16 {
  font-size: 16px;
}
.f20 {
  font-size: 20px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
