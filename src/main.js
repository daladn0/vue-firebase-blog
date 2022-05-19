import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import firebase from '@/store/firebase'
import auth from '@/auth'

import App from '@/App.vue'
import Spinner from '@/views/components/Spinner.vue'
import '@/assets/tailwind.css'

// svg include
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('@/assets/svg', true, /\.svg$/));

const app = createApp(App)

app.component('Spinner', Spinner)

app.use(router)
app.use(store)
app.mount('#app')