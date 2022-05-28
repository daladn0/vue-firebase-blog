<template>
  <div class="flex items-center w-fit p-2 bg-red-500 rounded-lg shadow">
    <svg class="w-5 h-5 text-white" viewBox="0 0 20 20">
      <use xlink:href="sprite.svg#danger" />
    </svg>
    <div class="ml-3 text-white font-normal">You've provided invalid image url.</div>
    <button @click="CLEAR_TOASTS" type="button" class="ml-4 p-1 rounded-full transition-all hover:bg-red-600">
      <svg class="w-5 h-5 text-white" viewBox="0 0 20 20">
        <use xlink:href="sprite.svg#close" />
      </svg>
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Toast',
  methods: {
    ...mapActions('toast', ['CLEAR_TOASTS']),
  }
}
</script>