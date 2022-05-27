import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import firebase from '@/config/firebase'

import { clickOutside } from '@/directives'
import { focus } from '@/directives'
import App from '@/App.vue'
import Spinner from '@views/components/base/Spinner.vue'
import FieldInput from '@views/components/base/FieldInput.vue'
import Selection from '@views/components/base/Selection.vue'
import '@/assets/tailwind.css'

// svg include
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('@/assets/svg', true, /\.svg$/));

const app = createApp(App)

app.directive('click-outside', clickOutside)
app.directive('focus', focus)
app.component('Spinner', Spinner)
app.component('FieldInput', FieldInput)
app.component('Selection', Selection)
app.use(router)
app.use(store)
app.mount('#app')