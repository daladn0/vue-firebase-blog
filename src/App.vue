<template>
  <div>
    <component :is="layout">
      <h1>Hi</h1>
    </component>
  </div>
</template>
<script>
import MainLayout from '@views/layouts/MainLayout.vue'
export default {
  name: 'App',
  components: {
    MainLayout
  },
  computed: {
    layout() {
      const route = this.$route.meta
      return route.layout ? route.layout : 'EmptyLayout'
    }
  }
}
</script>