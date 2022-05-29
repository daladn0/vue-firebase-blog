<template>
  <div 
    class="flex items-center w-fit p-2 rounded-lg shadow"
    :class="{
      'bg-red-500': status === 'error',
      'bg-green-500': status === 'success'
    }"
  >
    <svg class="w-5 h-5 text-white" viewBox="0 0 20 20">
      <use :xlink:href="`sprite.svg#${icon}`" />
    </svg>
    <div class="ml-3 text-white font-normal">{{message}}</div>
    <button 
      @click="CLEAR_TOASTS" 
      type="button" 
      class="ml-4 p-1 rounded-full transition-all"
      :class="{
        'hover:bg-red-600': status === 'error',
        'hover:bg-green-600': status === 'success',
      }"
    >
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
  props: ['status', 'message'],
  methods: {
    ...mapActions('toast', ['CLEAR_TOASTS']),
  },
  computed: {
    icon() {
      switch(this.status) {
        case 'error':
          return 'danger'
          break;
        case 'success':
          return 'tick'
          break;
      }
    }
  }
}
</script>