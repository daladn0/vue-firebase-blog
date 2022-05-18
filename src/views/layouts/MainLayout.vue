<template>
  <div>
    <Navbar/>
    <div class="container">
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