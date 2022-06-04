<template>
  <div class="w-[150px] rounded bg-gray-200 shadow text-gray-800">
    <button @click="$emit('update')" type="button" class="bg-gray-200 hover:bg-gray-300 group flex items-center justify-between w-full text-left transition-all p-2 rounded-t" >
      Edit post
      <svg class="w-5 h-5" viewBox='0 0 20 20'>
        <use xlink:href='/sprite.svg#pen' />
      </svg>

      <!-- Pointer -->
      <div class="w-5 h-5 bg-gray-200 group-hover:bg-gray-300 rounded-tl absolute top-0 right-3.5 tranfrom rotate-45 -translate-y-1/2 -translate-x-px transition-all"/>
    </button>

    <button
      type="button"
      class="bg-gray-200 hover:bg-gray-300 group flex items-center justify-between border-t border-gray-300 w-full text-left transition-all p-2"
      @click="$emit('remove')"
    >
      Remove post
      <svg class="w-5 h-5" viewBox='0 0 20 20'>
        <use xlink:href='/sprite.svg#close' />
      </svg>
    </button>
  </div>
</template>
