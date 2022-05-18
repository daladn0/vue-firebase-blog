import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '@/views/pages/Posts/PostsList.vue'

const routes = [
  {
    path: "/",
    name: "PostsList",
    component: PostsList,
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