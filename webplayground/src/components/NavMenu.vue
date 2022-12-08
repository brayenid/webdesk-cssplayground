<script setup>
import tippy from 'tippy.js'
import { onMounted } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
onMounted(() => {
  const signInButton = document.querySelector('.googleSignIn')
  const writeButton = document.querySelector('.link')
  const tippyInit = (element, dataset) => {
    tippy(element, {
      content: dataset
    })
  }
  tippyInit(signInButton, signInButton.dataset.title)
  tippyInit(writeButton, writeButton.dataset.title)
})
</script>
<template>
  <header>
    <nav>
      <div class="navWrap">
        <div class="titleAndMenu">
          <a href="/"> <img src="@/assets/websdeck.webp" alt="" /></a>
          <ul class="menuList" v-if="$route.name !== 'code' || $route.name !== 'codeedit'">
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/attribution">Attribution</RouterLink></li>
          </ul>
        </div>
        <div class="writeAndAccount">
          <div class="writeCode">
            <a class="link" data-title="Write code" href="/code"><font-awesome-icon icon="fa-solid fa-pen" /></a>
          </div>
          <GoogleLogin />
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
nav {
  background-color: #222;
}
.navWrap {
  width: 100%;
  max-width: var(--maxwidthContainer);
  margin: auto;
  background-color: #161616;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  height: 4rem;
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
.titleAndMenu img {
  width: 40px;
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
.writeAndAccount {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.googleSignIn {
  background-color: antiquewhite;
  color: #9c254d;
}
.signOut {
  background-color: rgb(208, 46, 46);
}
.writeCode a {
  padding: 0.5rem 1rem;
  color: #eee;
  border-radius: 0.3rem;
  border: 1px solid #333;
  font-size: 0.8rem;
}
.writeCode a:hover {
  color: #fff;
}
</style>
