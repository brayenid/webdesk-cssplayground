import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './assets/main.css'
import 'tippy.js/dist/tippy.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faJ, fas } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faGoogle, faHtml5, faCss3Alt, faJs } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faGithub, faLinkedin, faGoogle, faHtml5, faCss3Alt, faJs)

import { initializeApp, firebaseConfig } from './firebase'

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
