<script setup>
import tippy from 'tippy.js'
import { onMounted, ref } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
import { useRoute } from 'vue-router'
const isShowPlayMenu = ref(false)
const toggleMenu = () => {
  isShowPlayMenu.value = !isShowPlayMenu.value
}
onMounted(() => {
  if (innerWidth >= 850) {
    isShowPlayMenu.value = true
  }
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    tippy(button, {
      content: button.dataset.title
    })
  })
})
const route = useRoute()
</script>
<template>
  <header>
    <nav>
      <div class="titleAndMenu">
        <a href="/"> <img src="@/assets/websdeck.webp" alt="" /></a>
      </div>
      <ul class="buttonArea" v-show="isShowPlayMenu">
        <li>
          <button data-title="Code Area Toggle (CTRL+0)" id="collapseMenu" class="codeCollapseExpand"><font-awesome-icon icon="fa-solid fa-code" /></button>
        </li>
        <li>
          <button data-title="Run Code (CTRL+Enter)" id="runner" class="codeRunner"><font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon></button>
        </li>
        <li>
          <button data-title="Change View Vertical" class="codeViewVertical"><font-awesome-icon icon="fa-solid fa-arrows-up-down" /></button>
        </li>
        <li>
          <button data-title="Change View Horizontal" class="codeViewHorizontal"><font-awesome-icon icon="fa-solid fa-arrows-left-right" /></button>
        </li>
        <li>
          <input type="text" class="projectTitle" placeholder="Title" />
        </li>
        <li>
          <button data-title="Save" class="saveProject"><font-awesome-icon icon="fa-solid fa-save" /></button>
        </li>
        <li>
          <button v-show="route.params.id" data-title="Delete This" class="deleteProject"><font-awesome-icon icon="fa-solid fa-trash" /></button>
        </li>
        <li>
          <button v-show="route.params.id" data-title="Fork This" class="forkProject"><font-awesome-icon icon="fa-solid fa-code-fork" /></button>
        </li>
        <li>
          <button v-show="route.params.id" data-title="Project Details" class="detailsProject"><font-awesome-icon class="detailsIcon" icon="fa-solid fa-info" /></button>
        </li>
      </ul>
      <button @click="toggleMenu" class="menuToggle" data-title="Control Menu"><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
      <GoogleLogin />
    </nav>
  </header>
</template>
<style scoped>
nav {
  background-color: #222;
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
.titleAndMenu img {
  width: 40px;
  transform: translateY(2.7px);
}
.buttonArea {
  position: absolute;
  top: 3rem;
  left: 0;
  flex-wrap: wrap;
  width: 100%;
  background-color: #111;
  z-index: 40;
  display: flex;
  gap: 2rem;
  align-items: baseline;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem;
}
button {
  border: none;
  outline: none;
  color: #aaa;
  cursor: pointer;
  border-radius: 0.2rem;
  background-color: transparent;
}
button:hover {
  color: #fff;
}
.googleSignIn {
  background-color: antiquewhite;
  color: #9c254d;
}
.signOut {
  background-color: rgb(208, 46, 46);
}
.projectTitle {
  width: 140px;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border: none;
  border-bottom: 1px solid #333;
  color: #fff;
  outline: none;
}
@media screen and (min-width: 850px) {
  .buttonArea {
    position: static;
    flex-wrap: wrap;
    width: 100%;
    background-color: transparent;
    display: flex;
    gap: 2rem;
    align-items: baseline;
    justify-content: center;
    box-sizing: border-box;
    padding: 1rem;
  }
  .menuToggle {
    display: none;
  }
}
</style>
