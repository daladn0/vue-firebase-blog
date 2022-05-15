<template>
  <!-- Dropdown menu -->
  <div
    class="
      absolute
      right-0
      top-full
      transform
      translate-y-1
      z-20
      w-56
      mt-2
      overflow-hidden
      bg-white
      rounded-md
      shadow-xl
      dark:bg-gray-800
    "
  >
    <a
      class="
        flex
        items-center
        p-3
        text-sm text-gray-600
        transition-colors
        duration-200
        transform
        dark:text-gray-300
        hover:bg-gray-100
        dark:hover:bg-gray-700 dark:hover:text-white
      "
    >
      <img
        class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
        src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
        alt="jane avatar"
      />
      <div class="mx-1 max-w-80%">
        <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
          {{user.uid}}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{user.email}}
        </p>
      </div>
    </a>

    <hr class="border-gray-200 dark:border-gray-700" />

    <button
      @click="logout"
      class="
        w-full
        text-left
        block
        px-4
        py-3
        text-sm text-gray-600
        capitalize
        transition-colors
        duration-200
        transform
        dark:text-gray-300
        hover:bg-gray-100
        dark:hover:bg-gray-700 dark:hover:text-white
      "
    >
      Sign Out
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DropdownComponent",
  props: ['user'],
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>