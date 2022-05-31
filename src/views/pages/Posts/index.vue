<template>
  <div class="space-y-8">
    <QuickPost v-if="isLoggedIn && !isLoading" />

    <Spinner v-if="isLoading" class="mx-auto mt-4" />
    <div v-else-if="posts.length > 0" class='space-y-8'>
      <PostItem 
        v-for="(post, i) in [...posts].reverse()" 
        :key="post.id" 
        :post="post"
        :categories="categories"
        :users="users"
        :id='i'
        :showControlls="isLoggedIn"
        @remove='deletePost'
      />
    </div>
    
    <div v-else class="text-gray-600 text-center">No posts to show. Try to add some first.</div>
  </div>
</template>
<script>
import PostItem from "@views/pages/Posts/components/PostItem.vue";
import QuickPost from "@views/pages/Posts/components/QuickPost.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { collection, query, onSnapshot, getFirestore, orderBy } from "firebase/firestore";

export default {
  name: "PostsList",
  components: {
    PostItem,
    QuickPost,
  },
  data() {
    return {
      posts: [],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'users']),
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    ...mapActions('auth', ['fetchUsers']),
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('posts', ['removePost']),
    ...mapActions('toast', ['SHOW_SUCCESS']),
    ...mapMutations('posts', ['setPosts']),
    async deletePost(postID) {
      this.isLoading = true
      await this.removePost(postID)
      this.SHOW_SUCCESS('Post has been deleted!')
      this.isLoading = false
    }
  },
  async created() {
    this.isLoading = true

    await this.fetchCategories()
    await this.fetchUsers()

    const postsQuery = query(collection(getFirestore(), "posts"), orderBy('timestamp'));
    onSnapshot(postsQuery, (querySnapshot) => {
      const postsList = [];
      
      querySnapshot.forEach((doc) => {
          postsList.push(doc.data())
      });


      this.setPosts(postsList)
      this.posts = postsList

      this.isLoading = false
    })
  }
};
</script>
