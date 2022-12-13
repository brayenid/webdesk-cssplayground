import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import CodeIndex from '../views/CodeIndex.vue'
import HomeView from '../views/HomeView.vue'
import CodeView from '../views/CodeView.vue'
import CodeViewWithParams from '../views/CodeViewWithParams.vue'
import AboutView from '../views/AboutView.vue'
import AttributionView from '../views/AttributionView.vue'
import ErrorView from '../views/ErrorView.vue'

import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useAuthState } from '../stores/auth'

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
      name: 'codeindex',
      component: CodeIndex,
      meta: {
        title: 'Code'
      },
      children: [
        {
          path: '',
          name: 'code',
          component: CodeView,
          meta: {
            title: 'Write Codes'
          }
        },
        {
          path: ':id',
          name: 'codeedit',
          component: CodeViewWithParams,
          meta: {
            title: 'Websdeck'
          },
          beforeEnter: async (to, from, next) => {
            const docRef = doc(db, 'showcase', to.params.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              document.title = `${to.meta.title} - ${docSnap.data().projectTitle}`
              next()
            } else {
              next('/404')
            }
          }
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  document.title = to.meta.title
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      useAuthState().$patch({ isLoggedIn: true, userName: user.displayName, userId: user.uid, userPhotoUrl: user.photoURL })
    }
  })
})

export default router
