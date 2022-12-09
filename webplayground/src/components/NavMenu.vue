<script setup>
import tippy from 'tippy.js'
import { onMounted, ref } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
const menuList = ref(null)
const toggleMenu = ref(null)

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
  toggleMenu.value.addEventListener('click', () => {
    menuList.value.classList.toggle('menuListAppear')
  })
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.toggleMenuIndex') && !e.target.closest('.menuList')) {
      menuList.value.classList.remove('menuListAppear')
    }
  })
})
</script>
<template>
  <header>
    <nav>
      <div class="navWrap">
        <div class="titleAndMenu">
          <a href="/"> <img src="@/assets/websdeck.webp" alt="" /></a>
          <ul ref="menuList" class="menuList">
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/attribution">Attribution</RouterLink></li>
          </ul>
          <button ref="toggleMenu" class="toggleMenuIndex"><font-awesome-icon icon="fa-solid fa-bars" /></button>
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
  gap: 1rem;
  align-items: center;
}
.titleAndMenu img {
  width: 40px;
  transform: translateY(2.7px);
}
.menuList {
  background-color: #222;
  position: absolute;
  display: flex;
  width: 100%;
  top: 3.8rem;
  left: 0;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
  transform: translateX(-100%);
  transition: 0.1s ease-in-out;
  z-index: 20;
}
.menuListAppear {
  transform: translate(0);
}
.menuList a {
  text-decoration: none;
  color: #fff;
  display: block;
  padding: 1.5rem 0;
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
  color: #eee;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  padding: 1rem;
}
.writeCode a:hover {
  color: #fff;
}
.toggleMenuIndex {
  background-color: transparent;
  font-size: 1.5rem;
}
@media screen and (min-width: 700px) {
  .menuList {
    background-color: transparent;
    position: static;
    flex-direction: row;
    padding: 1rem;
    transform: translate(0);
    gap: 2rem;
  }
  .toggleMenuIndex {
    display: none;
  }
}
</style>
