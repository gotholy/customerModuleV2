<template>
  <div class="container">
    <aside class="aside">
      <Aside />
    </aside>
    <main class="main">
      <Main />
    </main>
  </div>
</template>

<script setup>
import Aside from '../components/aside.vue'
import Main from '../components/main.vue'

</script>

<style scoped>
.container {
  display: flex;
  margin: 0;
  padding: 0;
}
</style>