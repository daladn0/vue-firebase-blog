<template>
  <div>
    <p class="text-gray-700 mt-5 mx-auto text-center" v-if="!posts || posts.length === 0">
      This category has no posts
    </p>
    <div v-else class="relative">
      <div class="flex items-center absolute right-full top-0 mr-4 ">
        <p class="font-medium whitespace-nowrap mr-2">Items amount: </p>
        <Selection
          class="w-fit pr-8 flex-shrink-0 cursor-pointer"
          v-model="selectedAmount"
          :options='SELECTION_ITEMS_AMOUNT'
          valueField='title'
        />
      </div>
      <table class="w-full text-sm text-left text-gray-500 table-fixed">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 border border-gray-300 border-b"
        >
          <tr>
            <th class="w-14 p-4">№</th>
            <th class="w-4/12 p-4">Post title</th>
            <th class="w-2/12 p-4">Image</th>
            <th class="w-2/12 p-4">Category</th>
            <th class="w-3/12 p-4">Date</th>
            <th class="w-1/12 p-4">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="border border-gray-300 border-t-0">
          <tr
            v-for="(post, i) in postsToShow"
            :key="post.id"
            class="bg-white border-b hover:bg-gray-300"
          >
            <th class="p-4 truncate">{{ i + 1 }}</th>
            <th class="p-4 font-medium whitespace-nowrap truncate">
              <p v-if="post.title" class="text-gray-900 truncate">
                {{ post.title }}
              </p>
              <p v-else>[ No title ]</p>
            </th>
            <td class="p-4">
              <div v-if="post.photoURL" class="w-full aspect-video">
                <img :src="post.photoURL" />
              </div>
              <p v-else>[ No image ]</p>
            </td>
            <td class="p-4 truncate">
              <router-link
                class="hover:underline"
                :to="`/categories/${currentCategory.title}`"
                >{{ currentCategory.title }}</router-link
              >
            </td>
            <td class="p-4">{{formatDate(post.timestamp.seconds)}}</td>
            <td class="p-4 text-center">
              <router-link
                :to="`/post/${post.id}`"
                class="font-medium text-blue-600 hover:underline"
                >Open</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        class="flex items-center justify-center mx-auto mt-8"
        :totalPages='totalPagesCount'
        :currentPage='currentPage'
        @togglePage='currentPage = $event'
      />
    </div>
  </div>
</template>
<script>
import { SELECTION_ITEMS_AMOUNT } from '@/constants/selections'
import { formatDate } from '@/helpers'
import Pagination from '@views/components/common/Pagination.vue'
export default {
  name: "CategoriesTable",
  components: {
    Pagination,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    currentCategory: {
      type: Object,
    },
  },
  data() {
    return {
      currentPage: 1,
      postsToShow: [],
      selectedAmount: SELECTION_ITEMS_AMOUNT[0].title,
      SELECTION_ITEMS_AMOUNT,
    }
  },
  computed: {
    totalPostsCount() { 
      return this.posts.length
    },

    totalPagesCount() {
      return Math.ceil(this.totalPostsCount / this.selectedAmount)
    }
  },
  methods: {
    setPostsToShow() {
      const pagginatedPosts = this.posts.slice((this.currentPage - 1) * this.selectedAmount)
      this.postsToShow = pagginatedPosts.filter( (post, index) => index < this.selectedAmount )
    },
    formatDate
  },
  watch: {
    selectedAmount() {    
      this.currentPage = 1
      this.setPostsToShow()
    },
    currentPage() {
      this.setPostsToShow()
    },
  },
  mounted() {
    this.setPostsToShow()
  },
};
</script>
