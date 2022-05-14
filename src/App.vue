<template>
  <Header/>
  <div class="mx-auto container">
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
body {
  background: rgb(228, 228, 228);
}
</style>
