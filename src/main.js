// TODO
// [] implement helper for invalid fields & use them on every page where needed
// [] fix loading spinner on sign up page ( looks like there are two spinners ) 
// [] fix sign up page redirect ( there is a noticable gap between loading ending and redirecting to home page )
// [] helper methods for date formating
// [] post page doesn't show

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
import MainButton from '@views/components/base/MainButton.vue'
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
app.component('MainButton', MainButton)
app.use(router)
app.use(store)
app.mount('#app')