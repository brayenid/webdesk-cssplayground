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
      <p>© {{ thisYear }} <a href="https://brayenluhat.xyz" target="_blank" rel="noopener noreferrer">Brayen Luhat</a></p>
    </footer>
  </main>
</template>
<style scoped>
a {
  color: #666;
}
.indexContainer {
  max-width: 900px;
  margin: 1rem auto 0;
  overflow: hidden;
  border-radius: 0.2rem;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
}
footer {
  background-color: #161616;
  color: #666;
  font-size: 0.8rem;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 3rem;
  box-sizing: border-box;
  padding: 0 1rem;
}
</style>
