<template>
  <div class="w-full max-w-250px min-w-250px rounded bg-white shadow text-gray-500">
    <div class="flex items-center transition-all group hover:bg-gray-100 p-2"> <!--header-->
      <div class="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
        <img
          class="w-full h-full object-cover"
          :src="user.photoURL"
          :alt="user.displayName"
        />
      </div>
      <div class="text-left max-w-3/4 leading-tight">
        <p class="text-gray-800 font-semibold whitespace-nowrap block truncate">
         {{user.displayName}}
        </p>
        <p class="text-gray-500 truncate block">{{user.email}}</p>
      </div>

      <div class="w-5 h-5 bg-white rounded-tl absolute top-0 right-3.5 tranfrom rotate-45 -translate-y-1/2 -translate-x-px transition-all group-hover:bg-gray-100" /> <!-- pointer -->
    </div>

    <div class="w-full h-px bg-gray-200" />

    <router-link @click="$emit('close')" to='/' class="block w-full text-left transition-all hover:bg-gray-100 p-2">
      Home
    </router-link>
    <button type="button" class="w-full text-left transition-all hover:bg-gray-100 p-2">
      Profile
    </button>
    <router-link @click="$emit('close')" to='/categories' class="block w-full text-left transition-all hover:bg-gray-100 p-2">
      Categories
    </router-link>
    <router-link @click="$emit('close')" to="/create-post" type="button" class="block w-full text-left transition-all hover:bg-gray-100 p-2">
      Create Post
    </router-link>

    <div class="w-full h-px bg-gray-200" />

    <button @click="signOut" type="button" class="w-full text-left transition-all hover:bg-gray-100 p-2">
      Sign out
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "Dropdown",
  props: ['user'],
  methods: {
    ...mapActions('auth', ['logout']),
    async signOut() {
      await this.logout();
      this.$emit('close')
      this.$router.push('/login')
    },
  },
};
</script>
