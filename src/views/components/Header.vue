<template>
  <header
    class="
      w-screen
      flex flex-row
      items-center
      p-1
      px-8
      justify-between
      bg-white
      shadow-xs
    "
  >
    <!-- Logo -->
    <div class="text-lg text-gray-700 font-bold hidden md:flex">Daladn0's blog</div>

    <!-- Login button -->
    <div class="flex flex-row-reverse">
      <router-link
        to="/login"
        class="
          relative
          bg-blue-500
          text-white
          px-4
          py-1
          rounded
          text-lg
          font-bold
          overflow-visible
        "
      >
        Login
      </router-link>
    </div>
  </header>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "HeaderComponent",
  methods: {
    ...mapActions("auth", ["login"]),
  },
};
</script>