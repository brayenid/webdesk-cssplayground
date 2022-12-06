<script setup>
import tippy from 'tippy.js'
import { onMounted } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
import { useRoute } from 'vue-router'
onMounted(() => {
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
        <a href="/">
          <h1 class="websdeck">Webs<span>deck</span></h1></a
        >
      </div>
      <div class="buttonArea">
        <button data-title="Code Area Toggle (CTRL+0)" id="collapseMenu" class="codeCollapseExpand"><font-awesome-icon icon="fa-solid fa-code" /></button>
        <button data-title="Run Code (CTRL+Enter)" id="runner" class="codeRunner"><font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon></button>
        <button data-title="Change View Vertical" class="codeViewVertical"><font-awesome-icon icon="fa-solid fa-arrows-up-down" /></button>
        <button data-title="Change View Horizontal" class="codeViewHorizontal"><font-awesome-icon icon="fa-solid fa-arrows-left-right" /></button>
        <input type="text" class="projectTitle" placeholder="Title" />
        <button data-title="Save" class="saveProject"><font-awesome-icon icon="fa-solid fa-save" /></button>
        <button v-show="route.params.id" data-title="Delete This" class="deleteProject"><font-awesome-icon icon="fa-solid fa-trash" /></button>
      </div>
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
.buttonArea {
  display: flex;
  gap: 0.7rem;
}
button {
  border: 1px solid #333;
  outline: none;
  color: #aaa;
  padding: 0.5rem 1rem;
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
</style>
