<script setup>
import tippy from 'tippy.js'
import { onMounted } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
onMounted(() => {
  const signInButton = document.querySelector('.googleSignIn')
  tippy(signInButton, {
    content: signInButton.dataset.title
  })
})
</script>
<template>
  <header>
    <nav>
      <div class="titleAndMenu">
        <a href="/">
          <h1 class="websdeck">Webs<span>deck</span></h1></a
        >
        <ul class="menuList" v-if="$route.name !== 'code' || $route.name !== 'codeedit'">
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/attribution">Attribution</RouterLink></li>
        </ul>
      </div>
      <GoogleLogin />
    </nav>
  </header>
</template>
<style scoped>
nav {
  background-color: #161616;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  height: 3rem;
}
.websdeck {
  font-size: 1.5rem;
  font-family: 'Prompt', sans-serif;
  font-size: 700;
  color: #fff;
}
.websdeck span {
  color: #10a19d;
}
.titleAndMenu {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.menuList {
  display: flex;
  gap: 2rem;
}
.menuList a {
  text-decoration: none;
  color: #fff;
}
button {
  border: none;
  outline: none;
  color: #fff;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  border-radius: 0.2rem;
}
.googleSignIn {
  background-color: antiquewhite;
  color: #9c254d;
}
.signOut {
  background-color: rgb(208, 46, 46);
}
</style>
