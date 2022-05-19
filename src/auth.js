import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from '@/store'

store.commit('auth/setIsDataLoading', true)
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit('auth/setUser', user)
  } else {
    store.commit('auth/setUser', null)
  }

  store.commit('auth/setIsDataLoading', false)
});