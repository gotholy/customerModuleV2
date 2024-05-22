<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
<div id="app">
  <NavBar/>
  <RouterView />
</div>
</template>

<style scoped>
  #app{
    background-color: rgba(12, 125, 218, 0.703);
  }
</style>