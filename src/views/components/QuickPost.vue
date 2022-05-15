<template>
  <div>
    <form
      class="flex items-center justify-between p-2 w-full h-14 bg-white rounded-xl space-x-4"
    >
      <label
        v-if="uploadImage"
        class="h-full w-20 border cursor-pointer relative"
      >
        <input
          accept="image/png, image/gif, image/jpeg"
          class="absolute hidden w-full"
          type="file"
          @change="fileUpload"
        />
        <img :src="uploadImage" class="w-full h-full object-cover" />
        <button
          @click.stop.prevent="uploadImage = null"
          class="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full border-none outline-none cursor-pointer bg-red-500 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
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
      </label>

      <label
        v-else
        class="flex flex-shrink-0 items-center justify-center w-10 h-10 bg-gray-100 text-gray-500 p-1 rounded-full cursor-pointer transition-all hover:bg-gray-200"
      >
        <input
          accept="image/png, image/gif, image/jpeg"
          class="absolute hidden"
          type="file"
          @change="fileUpload"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </label>

      <input
        type="text"
        class="px-2 w-full h-full border rounded hover:border-gray-300"
        placeholder="Create post"
      />

      <button
        class="flex items-center justify-center flex-shrink-0 bg-blue-500 w-10 h-10 rounded-full text-white transition-all hover:bg-blue-600"
      >
        <svg class="w-5" viewBox="0 0 24 24">
          <use xlink:href="@/assets/svg/sprite.svg#send" />
        </svg>
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: "QuickPost",
  data() {
    return {
      uploadImage: null,
    };
  },
  methods: {
    fileUpload(e) {
      const file = e.target.files[0];
      this.uploadImage = URL.createObjectURL(file);
    },
  },
};
</script>
