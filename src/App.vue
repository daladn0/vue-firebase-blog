<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import MainLayout from "./views/layouts/MainLayout.vue"
import EmptyLayout from "./views/layouts/EmptyLayout.vue"
export default {
  name: 'App',
  components: {
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout' 
    }
  }
}
</script>

<style lang="scss">
body {
  background: rgb(237, 237, 237);
}
</style>
