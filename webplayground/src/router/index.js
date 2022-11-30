import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/CodeView.vue'
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

export default router
