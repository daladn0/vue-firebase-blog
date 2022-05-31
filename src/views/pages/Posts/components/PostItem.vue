<template>
  <div
    class="w-full bg-white rounded-lg border border-gray-200 shadow-md  overflow-hidden"
  >
    <div v-if="postAuthor" class="flex justify-between items-center px-4 py-2 border-b"> <!-- header -->
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full overflow-hidden mr-4">
          <img class="w-full h-full object-cover" :src="postAuthor?.photoURL" alt="">
        </div>
        <p class="text-gray-800">{{postAuthor?.displayName}}</p>
      </div>

      <button class="w-8 h-8 transition-all rounded-full flex items-center justify-center hover:bg-gray-100">
        <svg class="w-5 h-5 text-gray-700">
          <use xlink:href="sprite.svg#dots" />
        </svg>
      </button>
    </div>

    <router-link :to="`/post/${post.id}`" v-if="post.photoURL" class="w-fit"> <!-- image -->
      <img v-if="invalidURL" class="w-full h-full object-cover" src="@/assets/images/fallback.png" alt="">
      <img v-else class="w-full aspect-video object-cover" @error="invalidURL = true" :src="post.photoURL" alt="" />
    </router-link>

    <div class="p-5 pb-2.5"> <!-- content -->
      <router-link :to="`/post/${post.id}`" >
        <h5 v-if="post.title" class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{post.title}}
        </h5>
      </router-link>
      <p v-if="post.description" class="mb-3 font-normal text-gray-700 line-clamp_3 block">
        {{post.description}}
      </p>
      <div class="flex items-center justify-between">
        <router-link 
          :to="`/post/${post.id}`" 
          class="block w-fit text-blue-600 rounded-lg px-2 py-1 transition-all hover:bg-blue-100 -ml-2"
        >
          Read more
        </router-link>
        <div class="flex items-center text-gray-500">
          <template v-if="post.category_id && postCategory">
            <router-link :to="`/categories/${postCategory}`" class="hover:underline underline-offset-2">{{postCategory}}</router-link>
            <div class="w-1 h-1 mx-2 rounded-full bg-gray-400"/>
          </template>
          <p class="text-sm">{{formatDate(post.timestamp?.seconds) || ''}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/helpers'
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      default: () => []
    },
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      invalidURL: false,
    }
  },
  methods: {
    formatDate
  }, 
  computed: {
    postCategory() {
      if ( !this.post.category_id ) return ''
      return this.categories.find( category => category.id === this.post.category_id || '' )?.title
    },
    postAuthor() {
      return this.users.find( user => this.post.creator_id === user.uid ) || null
    }
  }
}
</script>
<style scoped >
.line-clamp_3 {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>