<template>
  <Modal v-if="showModal" @close='showModal = false' >
    <h3 class="text-2xl text-center">Do you really want to remove <span class="font-semibold">{{ selectedCategory.title }}</span> category?</h3>
    <div class="flex items-center justify-center mt-6">
      <button @click="deleteCategory();showModal = false;" type="button" class='flex items-center transition-all text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' >
        Remove
        <svg class="w-6 h-6 ml-2">
          <use xlink:href='sprite.svg#tick' />
        </svg>
      </button>
      <button @click="showModal = false;" type="button" class='flex items-center transition-all focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' >
        Cancel
        <svg class="w-6 h-6 ml-2">
          <use xlink:href='sprite.svg#close' />
        </svg>
      </button>
    </div>
  </Modal>
  <div class="space-y-8">
    <div class="grid gap-8 grid-cols-2">
      <Form
        @submit="createNewCategory"
        @invalid-submit="$refs['categoryTitle'].focus()"
        :validation-schema="addCategoryValidationSchema"
        class="space-y-4"
      >
        <Field name="categoryTitle" v-slot="{ field, errors, meta }">
          <div>
            <label
              for="categoryTitle"
              class="text-2xl text-gray-900 font-medium block mb-2 dark:text-gray-300"
            >
              Add new category
            </label>
            <input
              ref="categoryTitle"
              v-model="newCategoryTitle"
              v-bind="field"
              class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="Category title"
              :class="getFieldClasses(errors[0], meta.touched)"
            />
            <span class="text-red-500 text-sm" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </Field>

        <button
          type="submit"
          class="w-full py-2.5 font-semibold text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 rounded-lg px-5 text-center"
        >
          <Spinner class="block mx-auto" v-if="isDataLoading" />
          <span v-else>Create category</span>
        </button>
      </Form>

      <Form
        @submit="updateCategoryTitle"
        @invalid-submit="$refs['update-category'].focus()"
        class="space-y-4"
        :validation-schema="updateCategoryValidationSchema"
      >
        <div>
          <label for="new-category" class="text-2xl text-gray-900 font-medium block mb-2">
            Select category
          </label>
          <select
            class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
            v-model="selectedCategory"
          >
            <option value="" disabled selected>Choose category</option>
            <option
              v-for="category in categories"
              :key="category.title"
              :value="category"
            >
              {{ category.title }}
            </option>
          </select>
        </div>

        <div v-show="selectedCategory" class="space-y-4">
          <Field name="selectedCategoryTitle" v-slot="{ field, errors, meta }">
            <input
              v-bind="field"
              name="selectedCategoryTitle"
              ref="update-category"
              v-model="updatedCategoryTitle"
              class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="New title"
              :class="getFieldClasses(errors[0], meta.touched)"
            />
            <span class="text-red-500 text-sm" v-if="errors[0]">{{ errors[0] }}</span>
          </Field>

          <div class="w-full grid grid-cols-2 gap-4">
            <button
              type="submit"
              class="w-full py-2.5 font-semibold text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 rounded-lg px-5 text-center"
            >
              <Spinner class="block mx-auto" v-if="isDataLoading" />
              <span v-else>Update title</span>
            </button>
            <button
              type="button"
              @click="showModal = true"
              class="w-full font-semibold text-white outline-none bg-red-500 hover:bg-red-600 ring-red-700 focus:ring-2 rounded-lg px-5 text-center"
            >
              Remove category
            </button>
          </div>
        </div>
      </Form>
    </div>

    <div class="relative shadow-md" v-if="selectedCategory">
      <div class="flex items-center absolute -left-4 top-0 transform -translate-x-full">
        <p class="block mr-4">Amount:</p>
        <select
          class="w-full p-2.5 pr-6 bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg"
        >
          <option value="25" selected>25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>
      <PostsList />
    </div>
  </div>
</template>
<script>
import { markRaw } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { collection, query, onSnapshot, getFirestore } from "firebase/firestore";
import { Form, Field } from "vee-validate";
import { string, required, object, test } from "yup";
import { getFieldClasses } from "@/helpers/methods";
import PostsList from "@views/pages/Categories/components/PostsList.vue";
import Modal from '@views/components/Modal.vue' 

export default {
  name: "Categories",
  components: {
    Form,
    Field,
    PostsList,
    Modal,
  },
  data() {
    return {
      showModal: false,
      newCategoryTitle: "",
      selectedCategory: "",
      updatedCategoryTitle: "",
      addCategoryValidationSchema: markRaw(
        object({
          categoryTitle: string().required("Category name can't be empty!"),
        })
      ),
      updateCategoryValidationSchema: markRaw(
        object({
          selectedCategoryTitle: string()
            .test(
              "same-value",
              "Title is the same as before",
              (value) => value !== this.selectedCategory.title
            )
            .required("New category title can't be empty!"),
        })
      ),
    };
  },
  computed: {
    ...mapGetters("auth", ["user", "isDataLoading", "isLoggedIn", "error"]),
    ...mapGetters("categories", ["categories"]),
  },
  methods: {
    ...mapActions("categories", ["createCategory", "updateCategory", "removeCategory"]),
    ...mapMutations("categories", ["setCategories"]),
    async createNewCategory() {
      await this.createCategory({ title: this.newCategoryTitle });
    },
    async updateCategoryTitle() {
      await this.updateCategory({
        ...this.selectedCategory,
        title: this.updatedCategoryTitle,
      });
    },
    async deleteCategory() {
      await this.removeCategory({ id: this.selectedCategory.id })
    },
    getFieldClasses,
  },
  created() {
    // Receive new categories list from firebase whenever it updates
    const q = query(collection(getFirestore(), "categories"));
    onSnapshot(q, (querySnapshot) => {
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ ...doc.data(), id: doc.id });
      });
      this.setCategories(categories);
    });
  },
};
</script>
