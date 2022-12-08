<script setup>
import NavMenu from '../components/NavMenu.vue'
import { RouterView } from 'vue-router'
const thisYear = new Date().getFullYear()
</script>
<template>
  <main class="indexContainer">
    <NavMenu />
    <RouterView />
    <footer>
      <p>Websdeck</p>
      <p>© {{ thisYear }} <a href="https://brayenluhat.xyz" target="_blank" rel="noopener noreferrer">Brayen Luhat</a></p>
    </footer>
  </main>
</template>
<style scoped>
a {
  color: #666;
}
.indexContainer {
  margin: auto;
  overflow: hidden;
}
footer {
  background-color: #121212;
  color: #666;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  box-sizing: border-box;
  padding: 0 1rem;
  width: 100%;
  max-width: var(--maxwidthContainer);
  margin: auto;
}
</style>
