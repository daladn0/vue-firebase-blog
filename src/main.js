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

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
      if (node == parent) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}

app.directive('click-outside', {
  mounted: (el, binding, vnode) => {
    const trigger = document.getElementById(vnode.props.trigger)
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target) || trigger == event.target || isDescendant(trigger, event.target))) {
        binding.value()
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

app.use(router)
app.use(store)
app.mount('#app')