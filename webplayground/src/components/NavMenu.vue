<script setup>
// import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { RouterLink } from 'vue-router'
import tippy from 'tippy.js'
import { onMounted, ref } from 'vue'
// const auth = getAuth()
onMounted(() => {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    tippy(button, {
      content: button.dataset.title
    })
  })
})
// const provider = new GoogleAuthProvider()
// const signInGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((res) => {
//       console.log('Login google success')
//     })
//     .catch((err) => console.log(err))
// }
</script>
<template>
  <header>
    <nav>
      <div class="titleAndMenu">
        <RouterLink to="/">
          <h1 class="websdeck">Webs<span>deck</span></h1></RouterLink
        >
        <ul class="menuList">
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/attribution">Attribution</RouterLink></li>
        </ul>
      </div>
      <div class="buttonArea" v-if="$route.name !== 'about' && $route.name !== 'attribution'">
        <button data-title="Code Area Toggle (CTRL+0)" id="collapseMenu" class="codeCollapseExpand"><font-awesome-icon icon="fa-solid fa-code" /></button>
        <button data-title="Run Code (CTRL+Enter)" id="runner" class="codeRunner"><font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon></button>
        <button data-title="Change View Vertical" class="codeViewVertical"><font-awesome-icon icon="fa-solid fa-arrows-up-down" /></button>
        <button data-title="Change View Horizontal" class="codeViewHorizontal"><font-awesome-icon icon="fa-solid fa-arrows-left-right" /></button>
        <!-- <button data-title="Login with Google" class="codeViewHorizontal" @click="signInGoogle"><font-awesome-icon icon="fa-solid fa-arrows-left-right" /></button> -->
      </div>
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
.menuList {
  display: flex;
  gap: 2rem;
}
.menuList a {
  text-decoration: none;
  color: #fff;
}
.buttonArea {
  display: flex;
  gap: 0.5rem;
}
button {
  border: none;
  outline: none;
  color: #fff;
  padding: 0.5rem 1.5rem;
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
</style>
