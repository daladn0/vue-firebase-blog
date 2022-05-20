<template>
  <div :class="{ 'w-full h-screen flex items-center justify-center': isDataLoading }">
    <Spinner class="w-14 h-14" v-if="isDataLoading" />
    <div v-else>
      <Navbar />
      <div class="wrapper pt-8">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@views/layouts/components/Navbar.vue'
import { mapGetters } from "vuex";
export default {
  name: "MainLayout",
  computed: {
    ...mapGetters('auth', ['isDataLoading', 'isLoggedIn'])
  },
  components: {
    Navbar,
  }
};
</script>
<style lang="scss">
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}
</style>
