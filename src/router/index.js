import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/pages/Signup.vue'),
    meta: {
      layout: 'empty'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
