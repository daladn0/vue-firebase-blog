import { createApp } from 'vue'
import App from './App.vue'
import Spinner from '@/views/components/UI/Spinner.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

// eslint-disable-next-line
import firebase from '@/store/firebase'
// eslint-disable-next-line
import './auth'

const app = createApp(App)

app.component('SpinnerLoading', Spinner)

app.use(store)
app.use(router)
app.mount('#app')
