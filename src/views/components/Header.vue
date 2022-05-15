<template>
  <header
    class=" flex items-center justify-between w-full h-14 px-4 bg-blue-700 text-white"
  >
    <div>
      <router-link to="/" class="font-semibold text-lg px-4 py-2">Blog</router-link>
    </div>
    <div>
      <router-link to="/login"  class="px-4 py-0.5 border-2 border-white rounded-3xl font-semibold transitiona-all duration-200 hover:text-blue-700 hover:bg-white">
        Log in
      </router-link>
    </div>
  </header>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "HeaderComponent",
  methods: {
    ...mapActions('auth', ['login'])
  }
};
</script>