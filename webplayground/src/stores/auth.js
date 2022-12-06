import { defineStore } from 'pinia'

export const useAuthState = defineStore('auth', {
  state: () => {
    return {
      isLoggedIn: false,
      userName: 'guess',
      userId: null,
      userPhotoUrl: null
    }
  }
})
