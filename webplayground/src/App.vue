<script setup>
import { RouterView } from 'vue-router'
import { onAuthStateChanged, getAuth } from '@firebase/auth'
import { useAuthState } from './stores/auth'
import { onMounted } from 'vue'
onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      useAuthState().$patch({ isLoggedIn: true, userName: user.displayName, userId: user.uid, userPhotoUrl: user.photoURL })
    }
  })
})
</script>
<template>
  <RouterView />
</template>
