<template>
  <div class="pb-8">
    <div>
      <Navbar />
      <div class="wrapper pt-8">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@views/layouts/components/Navbar.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}
</style>
