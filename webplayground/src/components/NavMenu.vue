<script setup>
import tippy from 'tippy.js'
import { onMounted, ref, onUnmounted } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
import { useLoadButton } from '../stores/project'
import { useAuthState } from '../stores/auth'
import { useRoute } from 'vue-router'

const auth = useAuthState()
const route = useRoute()

const loadButton = useLoadButton()

const menuList = ref(null)
const toggleMenu = ref(null)
const loadProgress = ref(null)

const closeMenu = (e) => {
  if (!e.target.closest('.toggleMenuIndex') && !e.target.closest('.menuList')) {
    menuList.value.classList.remove('menuListAppear')
  }
}
const toggleMenuClick = () => {
  menuList.value.classList.toggle('menuListAppear')
}

onMounted(() => {
  loadButton.$patch({
    loadProgress: loadProgress.value
  })

  const writeButton = document.querySelector('.link')
  tippy(writeButton, {
    content: writeButton.dataset.title
  })
  tippy(loadProgress.value, {
    content: 'Load Your Projects'
  })
  toggleMenu.value.addEventListener('click', toggleMenuClick)
  document.addEventListener('click', closeMenu)
})
onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>
<template>
  <header>
    <nav>
      <div class="navWrap">
        <div class="titleAndMenu">
          <RouterLink to="/"> <img src="@/assets/websdeck.webp" alt="Websdeck logo" /></RouterLink>
          <ul ref="menuList" class="menuList">
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/attribution">Attribution</RouterLink></li>
          </ul>
          <button ref="toggleMenu" class="toggleMenuIndex" aria-label="Open Menu"><font-awesome-icon icon="fa-solid fa-bars" /></button>
        </div>
        <div class="writeAndAccount">
          <div v-show="auth.isLoggedIn && route.name === 'home'" class="loadProgress">
            <button ref="loadProgress" class="loadButton" aria-label="Load Your Projects"><font-awesome-icon icon="fa-solid fa-file-code" /></button>
          </div>
          <div class="writeCode" v-show="route.name === 'home'">
            <RouterLink class="link" data-title="Write code" to="/code" aria-label="Write Code"><font-awesome-icon icon="fa-solid fa-pen" /></RouterLink>
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
  height: 3.5rem;
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
  transform: translateY(2.7px);
}
.menuList {
  background-color: #222;
  position: absolute;
  display: flex;
  width: 100%;
  top: 3.5rem;
  left: 0;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
  transform: translateX(-100%);
  transition: 0.3s ease-in-out;
  z-index: 20;
  opacity: 0;
}
.menuListAppear {
  transform: translate(0);
  opacity: 1;
}
.menuList a {
  text-decoration: none;
  color: #eee;
  display: block;
  padding: 1.5rem 0;
}
.menuList a:hover {
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
  gap: 2rem;
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
  font-size: 1.2rem;
  padding: 1rem 0;
}
.writeCode a:hover {
  color: #fff;
}
.toggleMenuIndex {
  background-color: transparent;
  font-size: 1.5rem;
  color: #eee;
  padding: 0;
}
.loadProgress button {
  background-color: transparent;
  font-size: 1.2rem;
  padding: 1rem 0;
  color: #eee;
}
.loadProgress button:hover {
  color: #fff;
}
.loadProgress .progressList {
  max-width: 300px;
  height: auto;
  position: absolute;
  top: 4rem;
  background-color: #222;
}
@media screen and (min-width: 700px) {
  .menuList {
    background-color: transparent;
    position: static;
    flex-direction: row;
    padding: 1rem;
    transform: translate(0);
    gap: 2rem;
    opacity: 1;
  }
  .toggleMenuIndex {
    display: none;
  }
  .writeAndAccount {
    gap: 2.5rem;
  }
  .titleAndMenu {
    gap: 1rem;
  }
}
</style>
