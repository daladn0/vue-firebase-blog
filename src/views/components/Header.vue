<template>
  <header
    class="
      w-screen
      flex flex-row
      items-center
      px-8
      justify-between
      bg-white
      shadow-xs
      h-11
    "
  >
    <router-link to="/" class="text-lg text-gray-700 font-bold hidden md:flex">Daladn0's blog</router-link>

    <div>
      <div v-if="!isLoggedIn" class="flex flex-row-reverse">
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

      <div v-else class="relative">
        <button @click="showDropdown = !showDropdown" class="select-none cursor-pointer">
          {{ user.uid }}
        </button>
        <Dropdown :user="user" v-if="showDropdown" />
      </div>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import Dropdown from '@/views/components/UI/Dropdown.vue'
export default {
  name: "HeaderComponent",
  components: {
    Dropdown,
  },
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapState('auth', ['user', 'isLoggedIn'])
  }
};
</script>