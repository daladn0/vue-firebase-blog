<template>
  <Spinner v-if="isLoading" class="mx-auto mt-5" />
  <div v-else-if="!post">Such a post doesn't exist</div>
  <div v-else>
    <div class="bg-white rounded-lg shadow-lg p-4 space-y-4">
      <div class="flex items-center justify-between border-b border-gray-200 pb-4">
        <div class="flex items-center">
          <div
          class="w-12 h-12 mr-4 rounded-full overflow-hidden p-0.5 border-2 border-[#9333ea]"
        >
          <img
            class="w-full h-full object-cover rounded-full"
            :src="postAuthor.photoURL"
            alt=""
          />
        </div>
        <div>
          <p class="font-semibold text-lg text-gray-800">
            By
            <span class="text-[#9333ea]">{{ postAuthor.displayName }}</span>
            published
            <span class="font-normal">{{
              formatDate(post.timestamp.seconds) || ""
            }}</span>
          </p>
          <router-link
            v-if="postCategory"
            :to="`/categories/${postCategory.title}`"
            class="text-gray-500 hover:underline"
          >
            {{ postCategory.title }}
          </router-link>
        </div>
        </div>
        <button class="p-1.5 rounded-full transition-all hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <img
        v-if="post.photoURL"
        class="aspect-video w-full h-full object-cover rounded-lg"
        :src="post.photoURL"
        alt=""
      />
      <h3 v-if="post.title" class="text-2xl font-semibold">{{ post.title }}</h3>
      <p class="text-gray-800 leading-loose">{{ post.description }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { formatDate } from "@/helpers";
export default {
  name: "SinglePost",
  data() {
    return {
      isLoading: false,
      post: null,
      postAuthor: null,
      postCategory: null,
    };
  },
  methods: {
    ...mapActions("posts", ["fetchSinglePostByID"]),
    ...mapActions("auth", ["fetchUserByID"]),
    ...mapActions("categories", ["fetchCategoryByID"]),
    formatDate,
  },
  async created() {
    this.isLoading = true;
    const postID = this.$route.params.id;
    this.post = await this.fetchSinglePostByID(postID);
    this.postAuthor = await this.fetchUserByID(this.post.creator_id);
    this.postCategory = await this.fetchCategoryByID(this.post.category_id);
    this.isLoading = false;
  },
};
</script>
