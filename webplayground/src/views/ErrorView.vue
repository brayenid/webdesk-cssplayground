<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="error">
    <h1>404</h1>
    <p>There's nothing here, <RouterLink to="/">back to homepage?</RouterLink></p>
  </div>
</template>
<style scoped>
a {
  color: #ddd;
  font-weight: bolder;
}
.error {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  color: #ddd;
  font-size: 5rem;
}
p {
  color: #ccc;
  font-weight: lighter;
}
</style>
