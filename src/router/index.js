import { createRouter, createWebHistory } from 'vue-router'
import PostsList from '@/views/pages/Posts/index.vue'
import store from '@/store'

const routes = [
  {
    path: "/",
    name: "PostsList",
    component: PostsList,
    meta: {
      layout: 'MainLayout',
      sidebar: true,
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import('@/views/pages/Posts/PostCreate.vue'),
    meta: {
      layout: 'MainLayout',
      action: 'create'
    }
  },
  {
    path: '/update-post/:id',
    name: 'Update',
    component: () => import('@/views/pages/Posts/PostCreate.vue'),
    meta: {
      layout: 'MainLayout',
      action: 'update'
    }
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import('@views/pages/Categories/index.vue'),
    meta: {
      layout: 'MainLayout'
    },
    children: [
      {
        path: '',
        component: () => import('@views/pages/Categories/Manage.vue'),
      },
      {
        path: ':id',
        component: () => import('@views/pages/Categories/SingleCategory.vue'),
        meta: {
          sidebar: true
        }
      },
      {
        path: 'list',
        component: () => import('@views/pages/Categories/CategoriesList.vue'),
      }
    ]
  },
  // {
  //   path: '/categories/:id',
  //   name: 'Category',
  //   component: () => import('@views/pages/Categories/SingleCategory.vue'),
  //   meta: {
  //     layout: 'MainLayout'
  //   }
  // },
  {
    path: "/profile",
    name: "Profile",
    component: () => import('@views/pages/Profile/index.vue'),
    meta: {
      layout: 'MainLayout',
    }
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import('@views/pages/Posts/SinglePost.vue'),
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