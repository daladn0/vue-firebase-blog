import store from '@/store'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { setDoc, doc, getFirestore } from "firebase/firestore";
import router from '@/router'

onAuthStateChanged(getAuth(), (profile) => {
  if (profile) {
    console.log(profile)
    const user = {
        email: profile.email,
        displayName: profile.displayName,
        uid: profile.uid
    }
    store.commit('auth/setUser', user)
    router.push({name: 'home'})
  } else {
    store.commit('auth/setUser', null)
  }
});
