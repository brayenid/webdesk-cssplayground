<script setup>
import tippy from 'tippy.js'
import { onMounted } from 'vue'
import GoogleLogin from './GoogleLogin.vue'
onMounted(() => {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    tippy(button, {
      content: button.dataset.title
    })
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
      </div>
      <div class="buttonArea">
        <button data-title="Code Area Toggle (CTRL+0)" id="collapseMenu" class="codeCollapseExpand"><font-awesome-icon icon="fa-solid fa-code" /></button>
        <button data-title="Run Code (CTRL+Enter)" id="runner" class="codeRunner"><font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon></button>
        <button data-title="Change View Vertical" class="codeViewVertical"><font-awesome-icon icon="fa-solid fa-arrows-up-down" /></button>
        <button data-title="Change View Horizontal" class="codeViewHorizontal"><font-awesome-icon icon="fa-solid fa-arrows-left-right" /></button>
        <input type="text" class="projectTitle" placeholder="Title" />
        <button data-title="Save" class="saveProject"><font-awesome-icon icon="fa-solid fa-save" /></button>
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
  gap: 0.5rem;
}
button {
  border: none;
  outline: none;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.2rem;
}
.codeCollapseExpand {
  background-color: #2b3a55;
}
.codeCollapseExpand:active {
  background-color: #212d42;
}
.codeRunner {
  background-color: #10a19d;
}
.codeRunner:active {
  background-color: #0d8480;
}
.codeViewVertical,
.codeViewHorizontal {
  background-color: #9c254d;
}
.codeViewVertical:active,
.codeViewHorizontal:active {
  background-color: #892244;
}
.googleSignIn {
  background-color: antiquewhite;
  color: #9c254d;
}
.signOut {
  background-color: rgb(208, 46, 46);
}
.saveProject {
  background-color: #415f97;
  color: #fff;
}
.saveProject:active {
  background-color: #364f7c;
  color: #fff;
}
.projectTitle {
  width: 140px;
  background-color: #444;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border: none;
  border-radius: 0.2rem;
  color: #fff;
}
.projectTitle:focus {
  outline: none;
  background-color: #555;
}
</style>
