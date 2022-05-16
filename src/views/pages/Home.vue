<template>
  <div class="home">
    <div class="w-fit mx-auto" v-if="isDataLoading">
      <SpinnerLoading />
    </div>
    <div v-else class="max-w-2xl mx-auto flex flex-col justify-center">
      <QuickPost v-if="isLoggedIn" class="mb-8" />
      <div class="flex flex-col">
        <!-- eslint-disable-next-line -->
        <BlogPost v-for="post in posts" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { collection, orderBy, query, onSnapshot, getFirestore } from "firebase/firestore";
import QuickPost from "@/views/components/QuickPost.vue";
import BlogPost from "@/views/components/BlogPost.vue";
export default {
  name: "HomeView",
  computed: {
    ...mapState("auth", ["isLoggedIn", "user", "isDataLoading"]),
    ...mapState("posts", ["posts"]),
  },
  components: {
    BlogPost,
    QuickPost,
  },
  methods: {
    ...mapMutations('posts', ['setPosts'])
  },
  created() {
    const db = getFirestore()
    const q = query(collection(db, "posts"), orderBy('createdAt'));
    onSnapshot(q, collection => {
      const posts = [];
      collection.forEach((doc) => {
        posts.push(doc.data());
      });
      this.setPosts(posts.reverse())
    });
  },
};
</script>
