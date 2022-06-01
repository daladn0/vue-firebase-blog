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
      action: 'create',
      loginRequired: true,
    }
  },
  {
    path: '/update-post/:id',
    name: 'Update',
    component: () => import('@/views/pages/Posts/PostCreate.vue'),
    meta: {
      layout: 'MainLayout',
      action: 'update',
      loginRequired: true,
    }
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import('@views/pages/Categories/index.vue'),
    meta: {
      layout: 'MainLayout',
      loginRequired: true,
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
  {
    path: "/profile",
    name: "Profile",
    component: () => import('@views/pages/Profile/index.vue'),
    meta: {
      layout: 'MainLayout',
      loginRequired: true,
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

router.beforeEach((to, from, next) => {
  store.commit('auth/setError',null)

  const isLoggedIn = store.state.auth.isLoggedIn

  if ( to.meta.loginRequired && !isLoggedIn ) {
    next('/login')
    store.dispatch('toast/SHOW_ERROR', 'You have to log in to see all pages!')
    return
  }

  next()
})

export default router;