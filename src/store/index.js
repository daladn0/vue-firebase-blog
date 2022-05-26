import { createStore } from 'vuex'
import auth from '@/store/auth'
import categories from '@/store/categories'
import posts from '@/store/posts'

export default createStore({
  modules: {
    auth,
    categories,
    posts,
  }
})

