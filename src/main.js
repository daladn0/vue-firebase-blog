import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
// eslint-disable-next-line
import firebase from '@/store/firebase'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
