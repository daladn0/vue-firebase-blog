import { createRouter, createWebHistory } from 'vue-router'
import Posts from '@/views/pages/Posts/Posts.vue'

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts,
    meta: {
      layout: 'MainLayout'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;