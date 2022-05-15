<template>
  <div class="relative">
    <router-link 
      to="/" 
      class="flex items-center absolute left-1 top-1 text-blue-500 p-4 transition-all hover:text-blue-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back home
    </router-link>
    <slot />
  </div>
</template>
<script>
export default {
  name: "EmptyLayout",
};
</script>