<template>
  <div
    class="w-full h-14 flex items-center justify-between space-x-4 p-2 bg-white rounded-lg"
  >
    <div class="h-full transition-all">
      <button
        v-if="true"
        type="button"
        class="flex flex-shrink-0 items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-all hover:bg-gray-300"
      >
        <svg class="w-6 h-6 text-gray-500">
          <use xlink:href="sprite.svg#photo" />
        </svg>
      </button>

      <div class="w-20 h-full border" v-else>
        <img
          class="w-full h-full object-contain"
          src="https://cdn-icons-png.flaticon.com/512/7556/7556096.png"
        />
      </div>
    </div>

    <input
      placeholder="Create Post"
      type="text"
      class="w-full h-full transition-all px-2 outline-none border border-gray-300 hover:border-gray-400 focus:border-gray-500 rounded"
    />
    <button
      type="button"
      class="flex flex-shrink-0 ml-auto items-center justify-center w-10 h-full bg-blue-500 rounded transition-all hover:bg-blue-600"
    >
      <svg class="w-6 h-6 text-white">
        <use xlink:href="sprite.svg#send" />
      </svg>
    </button>
  </div>
</template>
