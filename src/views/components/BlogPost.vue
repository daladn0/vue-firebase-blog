<template>
  <div class="w-full mx-auto">
    <div class="flex justify-center p-10"  v-if="isLoading" >
      <SpinnerLoading/>
    </div>
    <div
      v-else
      class="bg-white shadow-md border border-gray-200 rounded-lg w-full mb-5"
    >
      <div class="flex items-center px-4 py-2 border-b">
        <div class="w-6 h-6 rounded-full overflow-hidden mr-2">
          <img
            class="w-full h-full object-cover"
            :src="postCreator.photoURL"
            :alt="postCreator.displayName"
          />
        </div>
        <button>{{ postCreator.displayName }}</button>
      </div>
      <a href="#">
        <img :src="post.image" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 v-if="post.title" class="text-gray-900 font-bold text-2xl tracking-tight">
            {{ post.title }}
          </h5>
        </a>
        <p class="font-normal text-gray-700" v-if="post.description">{{ post.description }}</p>
      </div>
      <div class="px-4 py-2 border-t">
        <router-link :to="`/post/${post.id}`" class="w-fit block px-2 py-1 text-blue-600 bg-opacity-50 rounded-md transition-all hover:bg-blue-100">
          Read more
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "BlogPost",
    props: ["post"],
    data() {
        return {
            isLoading: true,
            postCreator: null
        };
    },
    methods: {
        ...mapActions("auth", ["fetchUserByID"])
    },
    async mounted() {
        this.postCreator = await this.fetchUserByID(this.post.creator_id);
        this.isLoading = false
    },
};
</script>
