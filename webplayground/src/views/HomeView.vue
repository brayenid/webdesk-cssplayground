<script setup>
import { computed } from '@vue/reactivity'
import { getAuth } from '@firebase/auth'
import { RouterLink } from 'vue-router'

console.log(getAuth().currentUser)

const generateId = computed(() => {
  return Date.now()
})
</script>
<template>
  <h1>Showcase Projects</h1>
  <RouterLink :to="'/' + generateId">Create One</RouterLink>
</template>
