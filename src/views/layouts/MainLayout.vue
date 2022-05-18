<template>
  <div>
    <Navbar/>
    <div class="wrapper pt-8">
      <slot/>
    </div>
  </div>
</template>
<script>
import Navbar from '@views/components/Navbar/Navbar.vue'
export default {
  name: 'MainLayout',
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}
</style>