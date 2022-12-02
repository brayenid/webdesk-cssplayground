import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/prism-tomorrow.css'
import './assets/prism-line-numbers.css'
import './assets/prism-live.css'
import 'tippy.js/dist/tippy.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faGithub, faLinkedin)

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCP3knAtcSfGqFAokyGYeRmxOCiEU25MAg',
  authDomain: 'websdeck.firebaseapp.com',
  projectId: 'websdeck',
  storageBucket: 'websdeck.appspot.com',
  messagingSenderId: '511310335431',
  appId: '1:511310335431:web:e0186209769370215b1de2'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
