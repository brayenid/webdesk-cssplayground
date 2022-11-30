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
import { faUserSecret, faPlay, faCode, faArrowsUpDown, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret, faPlay, faCode, faArrowsUpDown, faArrowsLeftRight)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
