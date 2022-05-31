<template>
  <Spinner v-if="isLoading" class="mx-auto mt-5" />
  <aside v-else class="w-full h-fit pl-8 sticky top-8">
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <!-- header -->
      <div class="sidebar-header flex items-end justify-center h-20 text-center">
        <div class="text-white font-semibold absolute z-10 bottom-1">
          Newest categories
        </div>
        <div class="overlay" />
      </div>

      <!-- body -->
      <div v-if="categories && categories.length > 0">
        <ul>
          <li
            class="p-2 border-b"
            v-for="(category, i) in categories"
            :key="category.title"
          >
            <div class="flex items-center font-semibold text-sm">
              <p class="mr-2">{{ i + 1 }}</p>
              <router-link :to="`/categories/${category.title}`" class="w-8 h-8 mr-2 rounded-full overflow-hidden flex-shrink-0">
                <img
                  class="w-full h-full object-cover"
                  :src="category.photoURL"
                  alt=""
                />
              </router-link>
              <router-link
                :to="`/categories/${category.title}`"
                class="hover:underline block truncate pr-2"
                >{{ category.title }}</router-link
              >
              <router-link
                :to="`/categories/${category.title}`"
                class="ml-auto block h-full rounded-3xl bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 px-2 py-1"
              >
                Open
              </router-link>
            </div>
          </li>
        </ul>

        <router-link to="/categories" class="block mx-auto text-center py-2 text-sm text-gray-700">
          Add new
        </router-link>
      </div>
      <p class="text-gray-700 text-sm text-center py-2" v-else>
        No categories to show :(
      </p>
    </div>
  </aside>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      categories: null,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("categories", ["fetchLimitedCategories"]),
  },
  async created() {
    this.isLoading = true;
    this.categories = await this.fetchLimitedCategories({
      limit: 5,
      order: "timestamp",
    });
    this.isLoading = false;
  },
};
</script>
<style>
.sidebar-header {
  background: url("https://letsenhance.io/static/334225cab5be263aad8e3894809594ce/75c5a/MainAfter.jpg ")
    no-repeat center/cover;
  position: relative;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.700717787114846) 100%
  );
}
</style>
