<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import MainLayout from '@views/layouts/MainLayout.vue'
import EmptyLayout from '@views/layouts/EmptyLayout.vue'
export default {
  name: 'App',
  components: {
    MainLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      const route = this.$route.meta
      return route.layout ? route.layout : 'EmptyLayout'
    }
  }
}
</script>
<style>
body {
  background: rgb(235, 235, 235);
}
</style>