<template>
  <div class="w-[150px] rounded bg-gray-200 shadow text-gray-800">
    <button type="button" class="group block w-full text-left transition-all p-2" >
      Edit post
      <div class="w-5 h-5 bg-gray-200 rounded-tl absolute top-0 right-3.5 tranfrom rotate-45 -translate-y-1/2 -translate-x-px transition-all"/>
    </button>

    <div class="w-full h-px bg-gray-200" />

    <button
      type="button"
      class="w-full text-left text-white transition-all bg-red-500 p-2 rounded-b flex items-center justify-between"
      @click="$emit('remove')"
    >
      Remove post
      <svg class="w-5 h-5" viewBox='0 0 20 20'>
        <use xlink:href='/sprite.svg#close' />
      </svg>
    </button>
  </div>
</template>
