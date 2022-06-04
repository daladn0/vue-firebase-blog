<template>
  <nav>
    <ul class="flex items-center -space-x-px">
      <li>
        <button
          class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          :class="{
            'opacity-20 pointer-events-none' : currentPage === 1
          }"
          @click="goBack"
        >
          <svg class="w-5" viewBox="0 0 20 20">
            <use xlink:href="/sprite.svg#arrow-left2" />
          </svg>
        </button>
      </li>

      <li v-for='page in totalPages' :key='page'>
        <button
          class="py-2 px-3 leading-tight text-gray-500 border border-gray-300"
          :class="[ currentPage === page ? 'bg-gray-200' : 'bg-white hover:bg-gray-100 hover:text-gray-700' ]"
          @click="$emit('togglePage', page)"
        >
          {{page}}
        </button>
      </li>

      <li>
        <button
          class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          :class="{
            'opacity-20 pointer-events-none' : currentPage === totalPages
          }"
          @click="goForward"
        >
          <svg class="w-5" viewBox="0 0 20 20">
            <use xlink:href="/sprite.svg#arrow-right" />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['totalPages', 'currentPage'],
  methods: {
    goBack() {
      if ( this.currentPage === 1 ) return
      this.$emit('togglePage', this.currentPage  - 1)
    },
    goForward() {
      if ( this.currentPage === this.totalPages ) return
      this.$emit('togglePage', this.currentPage  + 1)
    }
  }
}
</script>