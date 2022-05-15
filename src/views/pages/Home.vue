<template>
  <div class="home">
    <div class="flex justify-center">
      <BlogPost/>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/views/components/BlogPost.vue'
export default {
  name: "HomeView",
  components: {
    BlogPost
  }
};
</script>
