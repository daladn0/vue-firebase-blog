import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '@/views/pages/Posts/index.vue'
import store from '@/store'

const routes = [
  {
    path: "/",
    name: "PostsList",
    component: PostsList,
    meta: {
      layout: 'MainLayout'
    }
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import('@views/pages/Categories/index.vue'),
    meta: {
      layout: 'MainLayout'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@views/pages/Login/index.vue'),
    meta: {
      layout: 'EmptyLayout'
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import('@views/pages/Signup/index.vue'),
    meta: {
      layout: 'EmptyLayout'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((from, to, next) => {
  store.commit('auth/setError',null)
  next()
})

export default router;