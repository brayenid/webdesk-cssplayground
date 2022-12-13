<script setup>
import { GoogleAuthProvider, signInWithPopup, signOut, getAuth } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useAuthState } from '../stores/auth'
import tippy from 'tippy.js'

const authenticated = useAuthState()
const showPopUp = ref(false)
const googleSignIn = ref(null)

onMounted(() => {
  if (!authenticated.isLoggedIn) {
    tippy(googleSignIn.value, {
      content: 'Sign In with Google'
    })
  }
})

const provider = new GoogleAuthProvider()
const signInGoogle = () => {
  signInWithPopup(getAuth(), provider)
    .then(() => {
      authenticated.$patch({ isLoggedIn: true, userName: getAuth().currentUser.displayName, userId: getAuth().currentUser.uid, userPhotoUrl: getAuth().currentUser.photoURL })
    })
    .catch((err) => console.log(err))
}
const signout = () => {
  signOut(getAuth()).then(() => {
    authenticated.$patch({ isLoggedIn: false })
  })
}
//Close modal SignOut by outclicking
document.addEventListener('click', (e) => {
  if (e.target.className !== 'userPhoto' && !e.target.closest('.signOutContainer') && showPopUp.value === true) {
    showPopUp.value = false
  }
})
</script>

<template>
  <div>
    <button ref="googleSignIn" v-if="!authenticated.isLoggedIn" class="googleSignIn buttonGoogle" @click="signInGoogle"><font-awesome-icon icon="fa-brands fa-google" /></button>
    <div class="hiUser" v-if="authenticated.isLoggedIn">
      <div class="signOutContainer" v-show="showPopUp">
        <h3 class="displayName">Hello, {{ getAuth().currentUser.displayName }}</h3>
        <button @click="signout" data-title="Sign Out" class="signOut buttonGoogle">Sign Out</button>
      </div>
      <div class="userPhotoContainer" @click="showPopUp = !showPopUp">
        <img class="userPhoto" :src="getAuth().currentUser.photoURL" />
      </div>
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
  background-color: #fff;
  color: #9c254d;
}
.signOut {
  background-color: rgb(208, 46, 46);
  width: max-content;
}
.signOut:hover {
  background-color: rgb(182, 38, 38);
  width: max-content;
}
.hiUser {
  display: flex;
  position: relative;
}
.userPhotoContainer {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.userPhotoContainer img {
  width: 100%;
}
.signOutContainer {
  position: absolute;
  bottom: -6.8rem;
  right: 0;
  background-color: #333;
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  border-radius: 0.2rem;
  color: #fff;
  z-index: 40;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}
</style>
