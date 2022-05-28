<template>
  <div class="pb-8">
    <div class="relative">
      <Navbar />
      <div class="wrapper pt-8">
        <transition name="toast">
          <Toast v-if="visible" :message="message" class="absolute left-4 top-16"/>
        </transition>
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@views/layouts/components/Navbar.vue";
import Toast from '@views/components/common/Toast.vue'
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Toast,
  },
  computed: {
    ...mapGetters('toast', ['message', 'visible']),
  }
};
</script>
<style lang="scss">
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.toast-enter-active,
.toast-leave-active {
  transition: all .1s linear;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(150%);
}
</style>
