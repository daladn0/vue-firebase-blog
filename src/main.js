import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import '@/assets/tailwind.css'

// svg include
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('@/assets/svg', true, /\.svg$/));

const app = createApp(App)
app.use(router)
app.mount('#app')