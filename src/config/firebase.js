import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import store from '@/store'

initializeApp({
    apiKey: "AIzaSyAKbtv53y2A9-xad4ru3ITJu_fYCrVLmRE",
    authDomain: "blog-f03d3.firebaseapp.com",
    projectId: "blog-f03d3",
    storageBucket: "blog-f03d3.appspot.com",
    messagingSenderId: "1091999418059",
    appId: "1:1091999418059:web:a451d875c9244e69aebd4e"
})

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