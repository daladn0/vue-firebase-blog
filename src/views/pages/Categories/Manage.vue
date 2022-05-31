<template>
  <Modal v-if="showModal" @close="showModal = false">
    <h3 class="text-2xl text-center">
      Do you really want to remove
      <span class="font-semibold">{{ selectedCategory.title }}</span> category?
    </h3>
    <div class="flex items-center justify-center mt-6">
      <button
        @click="
          deleteCategory();
          showModal = false;
        "
        type="button"
        class="flex items-center transition-all text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Remove
        <svg class="w-6 h-6 ml-2">
          <use xlink:href="/sprite.svg#tick" />
        </svg>
      </button>
      <button
        @click="showModal = false"
        type="button"
        class="flex items-center transition-all focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Cancel
        <svg class="w-6 h-6 ml-2">
          <use xlink:href="/sprite.svg#close" />
        </svg>
      </button>
    </div>
  </Modal>
  <Spinner v-if="isLoading" class="mx-auto mt-4" />
  <div v-else class="space-y-8">
    <div class="space-y-8">
      <img class="absolute w-0 h-0 opacity-0 invisible pointer-events-none" :src="newCategoryImage" @error="chechImageValidation" @load='setCategoryImage' />
      <Form
        @submit="createNewCategory"
        :validation-schema="newCategoryValidation"
        class="w-full p-8 bg-white space-y-8"
      >
        <h3 class="text-2xl text-gray-900 font-medium block mb-2">
          Create category
        </h3>
        <Field name="categoryTitle" v-slot="{ field, errors, meta }">
          <div>
            <label for="categoryTitle" class="block mb-2">Add new category:</label>
            <input
              v-model="newCategoryTitle"
              v-bind="field"
              class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="Category title"
              :class="getFieldClasses(errors[0], meta.touched)"
            />
            <span class="text-red-500 text-sm" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </Field>

        <Field name="categoryImage" v-slot="{ field, errors, meta }">
          <div>
            <label for="categoryImage" class="block mb-2">Category image:</label>
            <div class="flex items-center space-x-4">
              <input
                v-model="newCategoryImageURL"
                v-bind="field"
                class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                placeholder="Category title"
                :class="getFieldClasses(errors[0], meta.touched)"
              />
              <MainButton class="flex-shrink-0" type="button" @click="newCategoryImage = newCategoryImageURL">add photo</MainButton>
            </div>
            <span class="text-red-500 text-sm" v-if="errors[0]">{{ errors[0] }}</span>
          </div>
        </Field>

        <div v-if="showImage" class="w-full aspect-video">
          <img :src='newCategoryImage' class="w-full h-full object-cover" alt="">
        </div>

        <button
          type="submit"
          class="w-full py-2.5 font-semibold text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 rounded-lg px-5 text-center"
        >
          <span>Create category</span>
        </button>
      </Form>

      <Form
        @submit="updateCategoryTitle"
        @invalid-submit="$refs['update-category'].focus()"
        class="w-full p-8 bg-white space-y-4"
        :validation-schema="updateCategoryValidationSchema"
      >
        <div>
          <label for="new-category" class="text-2xl text-gray-900 font-medium block mb-2">
            Update category
          </label>
          <Selection
            v-model="selectedCategory"
            disabledOption="Choose category"
            :options="categories"
            value-field="id"
          />
        </div>

        <div v-show="isCategorySelected" class="space-y-4">
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
              <Spinner class="block mx-auto" v-if="isLoading" />
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

    <div class="relative shadow-md" v-if="isCategorySelected">
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
import { Form, Field } from "vee-validate";
import { string, required, object, test } from "yup";
import { getFieldClasses } from "@/helpers";
import PostsList from "@views/pages/Categories/components/PostsList.vue";
import Modal from "@views/components/common/Modal.vue";
import { collection, query, onSnapshot, getFirestore, orderBy } from "firebase/firestore";

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
      showImage: false,
      categories: [],
      isLoading: false,
      showModal: false,
      newCategoryTitle: "",
      newCategoryImage: "",
      newCategoryImageURL: "",
      selectedCategory: "disabled-option",
      updatedCategoryTitle: "",
      newCategoryValidation: markRaw(object({
        categoryTitle: string()
          .required("Category name can't be empty!")
          .test("already-exists", "Such a category already exists", (value) => {
            let exists = true;
            this.categories.forEach((category) => {
              if (!value) return;
              if (value.toLowerCase() === category.title.toLowerCase()) {
                exists = false;
              }
            });

            return exists;
          }),
        categoryImage: string().required('Image url can\'t be empty!')
      })),
      updateCategoryValidationSchema: markRaw(
        object({
          selectedCategoryTitle: string()
            .test(
              "same-value",
              "Title is the same as before",
              (value) =>
                value !==
                this.categories.find((category) => category.id === this.selectedCategory)
                  ?.title
            )
            .required("New category title can't be empty!"),
        })
      ),
    };
  },
  computed: {
    isCategorySelected() {
      return this.selectedCategory && this.selectedCategory !== "disabled-option";
    },
  },
  methods: {
    ...mapActions("categories", ["createCategory", "updateCategory", "removeCategory"]),
    ...mapActions("toast", ["SHOW_ERROR", "SHOW_SUCCESS"]),
    ...mapMutations("categories", ["setCategories"]),
    async createNewCategory() {
      if ( !this.newCategoryImage ) {
        this.SHOW_ERROR('You didn\'t provide an image!')
        return
      }
      this.isLoading = true;
      await this.createCategory({ title: this.newCategoryTitle, photoURL: this.newCategoryImage })
      this.showImage = false
      this.newCategoryImage = ''
      this.isLoading = false;
      this.SHOW_SUCCESS('Category has been added!')
    },
    async updateCategoryTitle() {
      this.isLoading = true;
      await this.updateCategory({
        ...this.categories.find((category) => category.id === this.selectedCategory),
        title: this.updatedCategoryTitle,
      });
      this.isLoading = false;
    },
    async deleteCategory() {
      this.isLoading = true;
      await this.removeCategory({ id: this.selectedCategory });
      this.selectedCategory = "disabled-option";
      this.isLoading = false;
    },
    setCategoryImage() {
      this.showImage = true
    },
    chechImageValidation() {
      if ( !this.newCategoryImage ) return 
      this.showImage = false
      this.SHOW_ERROR('Invalid image url!')
      this.newCategoryImage = ''
      this.newCategoryImageURL = ''
    },
    getFieldClasses,
  },
  created() {
    this.isLoading = true;
    const categoriesQuery = query(collection(getFirestore(), "categories"));
    onSnapshot(categoriesQuery, (querySnapshot) => {
      const categories = [];

      querySnapshot.forEach((doc) => {
        categories.push({ ...doc.data(), id: doc.id });
      });

      this.categories = categories;
      this.setCategories(categories);

      this.isLoading = false;
    });
  },
};
</script>
