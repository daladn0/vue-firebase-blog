<template>
  <div>
    <transition name="toast">
      <Toast v-if="visible" :message="message" :status="status" class="fixed left-4 bottom-4 z-20"/>
    </transition>
    <component :is="layout" :key="$route.path">
      <router-view />
    </component>
  </div>
</template>
<script>
import MainLayout from "@views/layouts/MainLayout.vue";
import EmptyLayout from "@views/layouts/EmptyLayout.vue";
import Toast from '@views/components/common/Toast.vue';
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    MainLayout,
    EmptyLayout,
    Toast,
  },
  computed: {
    ...mapGetters('toast', ['message', 'visible', 'status']),
    layout() {
      const route = this.$route.meta;
      return route.layout ? route.layout : "EmptyLayout";
    },
  },
};
</script>
<style>
body {
  background: rgb(235, 235, 235);
}
select {
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right;
  background-size: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-position-x: 95%;
}

.toast-enter-active,
.toast-leave-active {
  transition: all .1s linear;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-150%);
}
</style>
