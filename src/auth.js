import store from '@/store'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/router'

onAuthStateChanged(getAuth(), (profile) => {
  if (profile) {
    const user = {
        email: profile.email,
        displayName: profile.displayName,
        uid: profile.uid,
        photoURL: profile.photoURL
    }
    store.commit('auth/setUser', user)
    router.push({name: 'home'})
  } else {
    store.commit('auth/setUser', null)
  }
});
