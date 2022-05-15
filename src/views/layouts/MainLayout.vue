<template>
    <div>
        <Header/>
        <div class="mx-auto container">
            <slot/>
        </div>
    </div>
</template>

<script>
import Header from '@/views/components/Header.vue'
export default {
  name: 'MainLayout',
  components: {
    Header
  }
}
</script>