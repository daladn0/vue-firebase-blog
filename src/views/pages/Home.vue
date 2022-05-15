<template>
  <div class="home">
    <div class="max-w-2xl mx-auto flex flex-col justify-center">
      <QuickPost v-if="isLoggedIn" class="mb-8"/>
      <div class="flex flex-col">
        <BlogPost/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuickPost from '@/views/components/QuickPost.vue'
import BlogPost from '@/views/components/BlogPost.vue'
export default {
  name: "HomeView",
  computed: {
    ...mapState('auth', ['isLoggedIn', 'user', 'isDataLoading'])
  },
  components: {
    BlogPost,
    QuickPost,
  }
};
</script>
