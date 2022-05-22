import { createStore } from 'vuex'
import auth from '@/store/auth'
import categories from '@/store/categories'

export default createStore({
  modules: {
    auth,
    categories,
  }
})

