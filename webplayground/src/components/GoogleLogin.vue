<script setup>
import { GoogleAuthProvider, signInWithPopup, signOut, getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthState } from '../stores/auth'
import tippy from 'tippy.js'

const authenticated = useAuthState()
const router = useRouter()

let auth
onMounted(() => {
  const buttonGoogle = document.querySelectorAll('.buttonGoogle')
  buttonGoogle.forEach((button) => {
    tippy(button, {
      content: button.dataset.title
    })
  })
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      authenticated.$patch({ isLoggedIn: true, userName: getAuth().currentUser.displayName, userId: getAuth().currentUser.uid })
    }
  })
})

const provider = new GoogleAuthProvider()
const signInGoogle = () => {
  signInWithPopup(getAuth(), provider)
    .then(() => {
      authenticated.$patch({ isLoggedIn: true, userName: getAuth().currentUser.displayName, userId: getAuth().currentUser.uid })
    })
    .catch((err) => console.log(err))
}
const signout = () => {
  signOut(getAuth()).then(() => {
    router.push('/')
    authenticated.$patch({ isLoggedIn: false })
  })
}
</script>

<template>
  <div>
    <button v-if="!authenticated.isLoggedIn" data-title="Login with Google" class="googleSignIn buttonGoogle" @click="signInGoogle"><font-awesome-icon icon="fa-brands fa-google" /></button>
    <div class="hiUser" v-if="authenticated.isLoggedIn">
      <button @click="signout" data-title="Sign Out" class="signOut buttonGoogle">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
button {
  border: none;
  outline: none;
  color: #fff;
  padding: 0.5rem 1rem;
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
