<!-- HTML -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>やることリスト</p>
  </div>
</template>

<!-- Java Script -->
<script>
export default {
  name: 'HeaderItem',   // App.vueにおける「import HelloWorld from './components/Header.vue'」
  props: {
    msg: String     // 定義
  }
}
</script>

<!-- スコープ付きCSS -->
<style scoped>
p {
  margin: 5px 0 0;
}
</style>