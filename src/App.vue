<!-- 単一ファイルコンポーネント -->
<!-- HTML -->

<template>
  <div>
    <HeaderItem msg="ToDo Application"/>    <!-- HeaderItemを配置、Header.vueにmsgを渡す -->
    <MainItem/>                             <!-- MainItemを配置 -->
  </div>
</template>

<!-- Java Script -->
<script>
  import HeaderItem from './components/HeaderItem.vue'  // HeaderItem.vueを読み込む
  import MainItem from './components/MainItem.vue'      // MainItem.vueを読み込む

  export default {    // export defaultによって外部からの参照を可能にする
    name: 'App',      // main.jsにおける「import App from './App.vue'」
    components: {
      HeaderItem,
      MainItem
    }
  }
</script>

<!-- CSS -->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>