import { createRouter, createWebHistory } from 'vue-router'
import PropertyView from '../views/property/PropertyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PropertyView,
    },
  ],
})

export default router
