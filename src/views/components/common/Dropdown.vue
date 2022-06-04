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

    <router-link 
      v-for="link in links" 
      :key="link.path" 
      :to="link.path" @click="$emit('close')" 
      class="flex items-center w-full text-left transition-all hover:bg-gray-100 px-2 py-2.5"
    >
      <svg class='w-5 mr-2' viewBox='0 0 24 24'>
        <use :xlink:href="`/sprite.svg/#${link.icon}`" />
      </svg>
      {{link.title}}
    </router-link>

    <div class="w-full h-px bg-gray-200" />

    <button @click="signOut" type="button" class="flex justify-center items-center w-full text-left transition-all hover:bg-gray-100 px-2 py-2.5">
      Sign out
      <svg class="w-5 ml-2" viewBox='0 0 24 24'>
        <use xlink:href='/sprite.svg#logout' />
      </svg>
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
    ...mapActions('toast', ['SHOW_SUCCESS']),
    async signOut() {
      await this.logout();
      this.$emit('close')
      this.$router.push('/login')
      this.SHOW_SUCCESS('You\'ve been logged out!')
    },
  },
  data() {
    return {
      links: [
        { path: '/', title: 'Home', icon: 'home' },
        { path: '/profile', title: 'Profile', icon: 'user' },
        { path: '/saved', title: 'Saved', icon: 'saved' },
        { path: '/categories', title: 'Categories', icon: 'categories' },
        { path: '/create-post', title: 'Create Post', icon: 'post' },
      ]
    }
  }
};
</script>
