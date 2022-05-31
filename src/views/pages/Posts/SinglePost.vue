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
        <button
          v-if="isLoggedIn"
          @click="showDropDown = !showDropDown"
          id="openDropdown"
          type="button"
          class="w-8 h-8 transition-all rounded-full flex items-center justify-center relative"
        >
          <svg class="w-5 h-5 text-gray-700">
            <use xlink:href="/sprite.svg#dots" />
          </svg>
          
          <PostDropdown
            @remove="deletePost"
            @update="$router.push(`/update-post/${post.id}`)"
            v-click-outside="() => (showDropDown = false)"
            trigger="openDropdown"
            class="absolute top-full mt-4 -right-2 block"
            v-if="showDropDown"
          />
        </button>
      </div>

      <img
        v-if="post.photoURL"
        class="aspect-video w-full h-full object-cover rounded-lg"
        :src="post.photoURL"
        alt=""
      />
      <h3 v-if="post.title" class="text-2xl font-semibold break-word">{{ post.title }}</h3>
      <p class="text-gray-800 leading-loose break-word">{{ post.description }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/helpers";
import PostDropdown from "@views/pages/Posts/components/PostDropdown.vue";
export default {
  name: "SinglePost",
  components: {
    PostDropdown,
  },
  data() {
    return {
      isLoading: false,
      post: null,
      postAuthor: null,
      postCategory: null,
      showDropDown: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("posts", ["fetchSinglePostByID", "removePost"]),
    ...mapActions("auth", ["fetchUserByID"]),
    ...mapActions("categories", ["fetchCategoryByID"]),
    ...mapActions("toast", ["SHOW_SUCCESS"]),
    async deletePost() {
      this.isLoading = true
      await this.removePost(this.post.id)
      this.SHOW_SUCCESS('The post has been removed!')
      this.$router.push('/')
      this.isLoading = false
    },
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
