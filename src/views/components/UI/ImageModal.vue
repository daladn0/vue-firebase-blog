<template>
  <!-- Wrapper -->
  <div
    class="flex items-center justify-center w-screen h-screen fixed inset-0 bg-black z-50 bg-opacity-70"
    @click.self="$emit('close')"
  >
    <!-- Inner -->
    <div>
      <h3 class="text-center text-2xl font-bold mb-2.5 text-white">Image URL:</h3>
      <div class="block w-md p-4 rounded-xl bg-white">
        <div 
          @keyup.enter="$emit('submit', url)" 
          @keyup.esc="$emit('close')"
          class="flex items-center space-x-4"
        >
          <input
            v-model="url"
            ref="url"
            type="text"
            class="h-10 px-2 w-80 border rounded hover:border-gray-300 outline-blue-600 outline-4"
            placeholder="Image URL"
          />
          <button
            type="submit"
            class="text-white uppercase font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="$emit('submit', url)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <!-- Close btn -->
    <button
      class="absolute top-6 right-6 cursor-pointer text-white p-2 rounded-md bg-black bg-opacity-0 transition-all hover:bg-opacity-50"
      @click.self="$emit('close')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: "ImageModal",
  data() {
    return {
      url: '',
    }
  },
  mounted() {
    this.$refs.url.focus();
  },
};
</script>
