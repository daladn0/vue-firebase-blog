<template>
  <div class="pb-8">
    <div class="relative">
      <Navbar />
      <div class="pt-8" :class="[ showSidebar ? 'extended-wrapper' : 'wrapper' ]">
        <div>
          <slot />
        </div>
        <Sidebar v-if="showSidebar"/>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@views/layouts/components/Navbar.vue";
import Sidebar from "@views/layouts/components/Sidebar.vue"

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      showSidebar: false,
    }
  },
  created() {
    if ( this.$route.meta.sidebar ) this.showSidebar = true
  }
};
</script>
<style lang="scss">
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.extended-wrapper {
  display: grid;
  grid-template-columns: 800px 400px;
  max-width: 1200px;
  margin: 0 auto;
}

</style>
