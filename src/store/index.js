import { createStore } from 'vuex'
import auth from '@/store/auth'
import categories from '@/store/categories'
import posts from '@/store/posts'
import toast from '@/store/toast'

export default createStore({
  modules: {
    auth,
    categories,
    posts,
    toast
  }
})

