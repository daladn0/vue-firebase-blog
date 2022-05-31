<template>
  <Spinner v-if="isLoading" class="mx-auto mt-5" />
  <p v-else-if="!category" class="text-center text-gray-700">
    Such a category doesn't exist :(
  </p>
  <p v-else-if="!posts || posts.length === 0" class="text-center text-gray-700">
    There are no posts in <span class="font-semibold">{{ category.title }}</span> category
    :( Try to add some first!
  </p>
  <div v-else>
    <div class="space-y-8">
      <div class="h-20 rounded-lg p-2 bg-white flex items-center justify-between">
        <p class="text-lg truncate pr-4">You're searching through the <span class="font-semibold">{{category.title}}</span> category.</p>
        <div class="w-1/3 h-full flex-shrink-0 relative">
          <img :src="category.photoURL" class="w-full h-full object-cover rounded-lg" />
          <p class="text-white text-lg font-semibold absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-[2] truncate max-w-full px-5">{{category.title}}</p>
          <div class="absolute left-0 top-0 w-full h-full bg-black rounded-lg bg-opacity-40 z-[1]" />
        </div>
      </div>
      <PostItem
        v-for="(post, i) in posts"
        :key="post.id"
        :post="post"
        :users="users"
        :categories="categories"
        :id='i'
        :showControlls="isLoggedIn"
        @remove="deletePost"
        @update="postID => $router.push(`/update-post/${postID}`)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import PostItem from "@views/pages/Posts/components/PostItem.vue";
export default {
  name: "SingleCategory",
  components: {
    PostItem,
  },
  data() {
    return {
      isLoading: false,
      category: null,
      posts: [],
      categories: [],
      users: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }, 
  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("posts", ["fetchPostsByCategory", "removePost"]),
    ...mapActions("auth", ["fetchUsers"]),
    ...mapActions("toast", ["SHOW_SUCCESS"]),
    async deletePost(postID) {
      this.isLoading = true
      await this.removePost(postID);
      this.posts = await this.fetchPostsByCategory(this.category.id);
      this.SHOW_SUCCESS('Post has been deleted')
      this.isLoading = false
    }
  },
  async created() {
    this.isLoading = true;
    const categoryTitle = this.$route.params.id;
    this.categories = await this.fetchCategories();
    this.category = this.categories.find((item) => item.title === categoryTitle) || null;

    if (!this.category) {
      this.isLoading = false;
      return;
    }

    this.posts = await this.fetchPostsByCategory(this.category.id);
    this.users = await this.fetchUsers();
    this.isLoading = false;
  },
};
</script>
