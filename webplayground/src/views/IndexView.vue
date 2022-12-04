<script setup>
import NavMenu from '../components/NavMenu.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <main class="indexContainer">
    <NavMenu />
    <RouterView />
  </main>
</template>
<style scoped>
.indexContainer {
  max-width: 900px;
  margin: 1rem auto 0;
  overflow: hidden;
  border-radius: 0.2rem;
}
</style>
