import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import HomeView from '../views/HomeView.vue'
import CodeView from '../views/CodeView.vue'
import CodeViewWithParams from '../views/CodeViewWithParams.vue'
import AboutView from '../views/AboutView.vue'
import AttributionView from '../views/AttributionView.vue'
import ErrorView from '../views/ErrorView.vue'

import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorView,
      meta: {
        title: 404
      }
    },
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: {
        title: 'Websdeck'
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            title: 'Websdeck'
          }
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
          meta: {
            title: 'About Websdeck'
          }
        },
        {
          path: 'attribution',
          name: 'attribution',
          component: AttributionView,
          meta: {
            title: 'Attribution'
          }
        }
      ]
    },
    {
      path: '/code',
      name: 'code',
      component: CodeView,
      meta: {
        requiresAuth: true,
        title: 'Write Codes'
      }
    },
    {
      path: '/code/:id',
      name: 'codeedit',
      component: CodeViewWithParams,
      meta: {
        // requiresAuth: true,
        title: 'Write Codes'
      },
      beforeEnter: async (to, from, next) => {
        const docRef = doc(db, 'showcase', to.params.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          next()
        } else {
          next('/404')
        }
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), (user) => {
      // removeListener()
      resolve(user)
    })
    reject
  })
}

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert('you dont have access')
      next('/')
    }
  } else {
    next()
  }
})

export default router
