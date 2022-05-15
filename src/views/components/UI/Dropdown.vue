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
        :src="user.photoURL"
        :alt="user.displayName"
      />
      <div class="mx-1 max-w-80%">
        <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
          {{user.displayName}}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
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