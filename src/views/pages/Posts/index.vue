<template>
  <Modal v-if="showModal">
    <div class="p-4">
      <p class="text-2xl mb-8">
        Do you really want to remove this post?
      </p>
      <div class="flex justify-center items-center space-x-4">
        <MainButton
          type="button"
          class="flex items-center"
          @click="
            deletePost();
            showModal = false;
          "
        >
          Remove
          <svg class="w-5 h-5 text-white ml-2">
            <use xlink:href="/sprite.svg#tick" />
          </svg>
        </MainButton>
        <MainButton
          type="button"
          class="bg-red-500 hover:bg-red-600 flex items-center focus:ring-0"
          @click="showModal = false"
        >
          Cancel
          <svg class="w-5 h-5 text-white ml-2">
            <use xlink:href="/sprite.svg#close" />
          </svg>
        </MainButton>
      </div>
    </div>
  </Modal>
  <div class="space-y-8">
    <QuickPost v-if="isLoggedIn && !isLoading" />

    <Spinner v-if="isLoading" class="mx-auto mt-4" />
    <div v-else-if="posts.length > 0" class="space-y-8">
      <PostItem
        v-for="(post, i) in [...posts].reverse()"
        :key="post.id"
        :post="post"
        :categories="categories"
        :users="users"
        :id="i"
        :showControlls="isLoggedIn"
        @remove="showModal = true; postToRemove = $event"
        @update="(postID) => $router.push(`/update-post/${postID}`)"
      />
    </div>

    <div v-else class="text-gray-600 text-center">
      No posts to show. Try to add some first.
    </div>
  </div>
</template>
<script>
import PostItem from "@views/pages/Posts/components/PostItem.vue";
import QuickPost from "@views/pages/Posts/components/QuickPost.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { collection, query, onSnapshot, getFirestore, orderBy } from "firebase/firestore";
import Modal from '@views/components/common/Modal.vue'

export default {
  name: "PostsList",
  components: {
    PostItem,
    QuickPost,
    Modal,
  },
  data() {
    return {
      postToRemove: null,
      posts: [],
      isLoading: false,
      showModal: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "users"]),
    ...mapGetters("categories", ["categories"]),
  },
  methods: {
    ...mapActions("auth", ["fetchUsers"]),
    ...mapActions("categories", ["fetchCategories"]),
    ...mapActions("posts", ["removePost"]),
    ...mapActions("toast", ["SHOW_SUCCESS"]),
    ...mapMutations("posts", ["setPosts"]),
    async deletePost() {
      this.isLoading = true;
      await this.removePost(this.postToRemove);
      this.SHOW_SUCCESS("Post has been deleted!");
      this.isLoading = false;
    },
  },
  async created() {
    this.isLoading = true;

    await this.fetchCategories();
    await this.fetchUsers();

    const postsQuery = query(collection(getFirestore(), "posts"), orderBy("timestamp"));
    onSnapshot(postsQuery, (querySnapshot) => {
      const postsList = [];

      querySnapshot.forEach((doc) => {
        postsList.push(doc.data());
      });

      this.setPosts(postsList);
      this.posts = postsList;

      this.isLoading = false;
    });
  },
};
</script>
