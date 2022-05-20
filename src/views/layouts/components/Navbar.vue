<template>
  <header class="w-full h-12 px-5 bg-white flex items-center justify-between">
    <router-link to="/" class="text-gray-700 font-semibold text-lg">Daladn0's Blog</router-link>
    <div class="relative h-full">
      <router-link to="/login" v-if="!isLoggedIn" type="button"
        class="block text-white my-1.5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none dark:focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-1 text-center">
        Login
      </router-link>
      <button id="triggerDropdown" @click="showDropDown = !showDropDown" v-else class="flex items-center relative transition-all px-2 h-full hover:bg-gray-100">
        <p class="text-gray-800">Mark Kostevych</p>
        <div class="w-8 h-8 rounded-full overflow-hidden ml-4">
          <img class="w-full h-full object-cover" src="https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg" alt="">
        </div>
      </button>

      <Dropdown trigger="triggerDropdown" v-click-outside="collapseDropdown" v-if="showDropDown" class="absolute right-0 top-full mt-4"/>
    </div>
  </header>
</template>
<script>
import Dropdown from '@views/components/Dropdown.vue';
import { mapState } from 'vuex';
export default {
  name: "Navbar",
  components: {
    Dropdown
  },
  data() {
    return {
      showDropDown: false,
    };
  },
  computed: {
    ...mapState('auth', ['user', 'isLoggedIn', 'isDataLoading']),
  },
  methods: {
      collapseDropdown() {
          this.showDropDown = false
      }
  }
};
</script>