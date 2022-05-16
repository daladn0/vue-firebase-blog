import { createStore } from 'vuex'
import auth from '@/store/auth'
import posts from '@/store/posts'

export default createStore({
  modules: {
    auth,
    posts,
  }
})
