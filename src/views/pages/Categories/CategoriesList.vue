<template>
    <Spinner v-if='isLoading' class="mx-auto mt-5" />
    <div v-else class="grid grid-cols-3 gap-6">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <router-link :to="`/categories/${category.title}`" class="block w-full h-16 relative cursor-pointer">
          <div class="absolute top-0 left-0 w-full h-full object-cover bg-black bg-opacity-50" />
          <img class='w-full h-full object-cover' :src="category.photoURL" alt="">
          <p class="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white text-lg font-semibold" >{{category.title}}</p>
        </router-link>
        <div>
          <p v-if="isCategoryEmpty(category, posts)" class='leading-[225px] text-center text-gray-700 text-sm'>No posts in this category :(</p>
          <ul v-else class="posts-list">
            <li 
              v-for='post in getPostsOfCategory(category, posts)' 
              :key="post.id"
              class="flex items-center justify-between w-full p-2 border-b hover:bg-gray-100"
            >
              <router-link :to='`/post/${post.id}`' class="block truncate pr-2">
                {{post.title}}
              </router-link>
              <router-link 
                :to="`/post/${post.id}`"
                class='block h-full rounded-3xl bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 px-2 py-1 text-sm'
              >
                open
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'CategoriesList',
  data() {
    return {
      categories: [],
      posts: [],
      isLoading: false,
    }
  },
  methods: {
    ...mapActions('posts', ['fetchPosts']),
    ...mapActions('categories', ['fetchCategories']),
    getPostsOfCategory(category, posts) {
      return posts.filter( post => post.category_id === category.id )
    },
    isCategoryEmpty(category, posts) {
      const dedicatedPosts = this.getPostsOfCategory(category, posts)
      if ( dedicatedPosts.length === 0 || !dedicatedPosts ) return true
      return false
    }
  },
  async created() {
    this.isLoading = true
    this.categories = await this.fetchCategories()
    this.posts = await this.fetchPosts()
    this.isLoading = false
  }
}
</script>
<style scoped>
.posts-list {
  max-height: 225px;
  overflow: auto;
}  
</style>