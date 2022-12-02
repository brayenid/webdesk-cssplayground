import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CodeView from '../views/CodeView.vue'
import AboutView from '../views/AboutView.vue'
import AttributionView from '../views/AttributionView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: `/:id`,
      name: 'code',
      component: CodeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/attribution',
      name: 'attribution',
      component: AttributionView
    }
  ]
})

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener()
//         resolve(user)
//       },
//       reject
//     )
//   })
// }

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
//   if (requiresAuth) {
//     if (await getCurrentUser()) {
//       next()
//     } else {
//       alert('you dont have access')
//       next('/')
//     }
//   } else {
//     next()
//   }
// })

export default router
