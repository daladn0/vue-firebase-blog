<template>
  <Spinner v-if="isLoading" class="mx-auto mt-5" />
  <div v-else>
    <!-- Add category -->
    <Form
      @submit="createNewCategory"
      class="flex flex-col bg-white p-8 rounded-lg shadow-md"
    >
      <img
        :src="newCategoryImage"
        @load="loadNewCategoryImage"
        @error="() => checkNewCategoryImage(handleReset)"
        class="w-0 h-0 absolute z-[-1] opacity-0 invisible pointer-events-none"
      />
      <h3 class="text-2xl text-left font-semibold mb-6">Add category</h3>
      <Field
        :value="newCategoryTitle"
        :rules="categoryTitleValidation"
        name="newCategoryTitle"
        v-slot="{ field, errors }"
      >
        <div class="mb-8">
          <label class="block mb-2.5">New category title: </label>
          <FieldInput
            v-model.lazy="newCategoryTitle"
            v-bind="field"
            class="py-2 w-full"
            placeholder="New category title"
          />
          <span class="text-sm text-red-500 mt-1">{{ errors[0] }}</span>
        </div>
      </Field>

      <Field
        name="newCategoryImageURLValidation"
        :rules="categoryImageURLValidation"
        v-slot="{ errors, field }"
      >
        <div>
          <label class="block mb-2.5">New category img:</label>
          <div class="flex items-center space-x-4">
            <FieldInput
              v-bind="field"
              :value="newCategoryImageURL"
              v-model.lazy="newCategoryImageURL"
              class="py-2 w-full"
              placeholder="New category image"
            />
            <MainButton type="button" @click="setNewCategoryImage" class="flex-shrink-0"
              >add photo</MainButton
            >
          </div>
          <span class="text-sm text-red-500 mt-1">{{ errors[0] }}</span>
        </div>
      </Field>

      <Spinner v-if="isImageLoading" class="mx-auto mt-8" />

      <div v-else-if="showNewCategoryImage" class="w-full aspect-video mt-8">
        <img class="w-full h-full object-cover" :src="newCategoryImage" alt="" />
      </div>

      <MainButton type="submit" class="w-fit mt-8">Create category</MainButton>
    </Form>

    <!-- Update Category -->
    <form
      @submit.prevent="updateSelectedCategory"
      class="flex flex-col bg-white p-8 rounded-lg shadow-md mt-8"
    >
      <img
        class="w-0 h-0 absolute z-[-1] opacity-0 invisible pointer-events-none"
        :src="selectedCategoryImage"
        @error="checkSelectedImageValidation"
        @load="changeSelectedImage"
      />

      <h3 class="text-2xl text-left font-semibold mb-6">Update category</h3>
      <Selection
        @update:modelValue="selectCategory"
        v-model="selectedCategory"
        :options="categories"
        valueField="id"
        disabledOption="Choose category"
      />
      <div
        v-if="selectedCategory && selectedCategory !== 'disabled-option'"
        class="mt-8 space-y-8"
      >
        <div>
          <label class="block mb-2.5">Selected category title:</label>
          <FieldInput
            v-model.lazy="selectedCategoryTitle"
            class="py-2 w-full"
            placeholder="Selected category title"
          />
        </div>
        <div>
          <label class="block mb-2.5">New category img:</label>
          <div class="flex items-center space-x-4">
            <FieldInput
              v-model.lazy="selectedCategoryImageURL"
              class="py-2 w-full"
              placeholder="New category image"
            />
            <MainButton
              type="button"
              @click="setSelectedCategoryImage"
              class="flex-shrink-0"
              >add photo</MainButton
            >
          </div>
        </div>

        <Spinner class="mx-auto mt-5" v-if="isSelectedImageLoading" />
        <div v-else class="mt-8 w-full aspect-video">
          <img class="w-full h-full object-cover" :src="selectedCategoryImage" />
        </div>
      </div>
      <div class="flex items-center">
        <MainButton class="mt-8" type="submit">Update category</MainButton>
        <MainButton
          class="mt-8 bg-red-500 hover:bg-red-600 ml-4"
          type="button"
          @click="deleteSelectedCategory"
          >Remove category</MainButton
        >
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Field, Form } from "vee-validate";
import { string, required } from "yup";
export default {
  name: "ManageCategories",
  components: {
    Form,
    Field,
  },
  data() {
    return {
      categories: [],
      isLoading: false,
      isImageLoading: false,

      selectedCategory: "disabled-option",
      selectedCategoryTitle: "",
      selectedCategoryImage: "",
      selectedCategoryImageURL: "",
      isSelectedImageLoading: false,

      newCategoryTitle: "",
      newCategoryImage: "",
      newCategoryImageURL: "",

      categoryTitleValidation: string()
        .required("Category title is required!")
        .test("already-exists", "Such a category already exists", (value) => {
          let notMatches = true;
          this.categories.forEach((category) => {
            if (category.title === value) notMatches = false;
          });
          return notMatches;
        }),
      categoryImageURLValidation: string().required("Category image is required!"),
      showNewCategoryImage: false,
    };
  },
  methods: {
    ...mapActions("toast", ["SHOW_ERROR", "CLEAR_TOASTS", "SHOW_SUCCESS"]),
    ...mapActions("categories", [
      "createCategory",
      "fetchCategories",
      "removeCategory",
      "updateCategory",
    ]),
    async createNewCategory() {
      if (!this.newCategoryImage) {
        this.CLEAR_TOASTS();
        this.SHOW_ERROR("Invalid image url!");
        return;
      }

      this.isLoading = true;

      await this.createCategory({
        title: this.newCategoryTitle,
        photoURL: this.newCategoryImage,
      });

      this.categories = await this.fetchCategories();

      this.SHOW_SUCCESS("Category is added");

      this.newCategoryTitle = "";
      this.newCategoryImage = "";
      this.newCategoryImageURL = "";
      this.showNewCategoryImage = false;

      this.isLoading = false;
    },
    async deleteSelectedCategory() {
      if (!this.selectedCategory || this.selectedCategory === "disabled-option") {
        this.SHOW_ERROR("You've not choosen category yet.");
        return;
      }

      this.isLoading = true;
      await this.removeCategory({ id: this.selectedCategory });
      this.categories = await this.fetchCategories();
      this.selectedCategory = "disabled-option";
      this.SHOW_SUCCESS("Category is deleted!");
      this.isLoading = false;
    },

    setNewCategoryImage() {
      if (!this.newCategoryImageURL) return;
      this.isImageLoading = true;
      this.newCategoryImage = this.newCategoryImageURL;
    },
    checkNewCategoryImage() {
      if (!this.newCategoryImage) return;

      this.newCategoryImage = "";
      this.newCategoryImageURL = "";
      this.showNewCategoryImage = false;
      this.SHOW_ERROR("Invalid image url!");

      this.isImageLoading = false;
    },
    loadNewCategoryImage() {
      this.CLEAR_TOASTS();
      this.showNewCategoryImage = true;
      this.isImageLoading = false;
    },

    selectCategory(category) {
      const { title, photoURL } = this.categories.find((c) => c.id === category);
      this.selectedCategoryImage = photoURL;
      this.selectedCategoryImageURL = photoURL;
      this.selectedCategoryTitle = title;
    },
    setSelectedCategoryImage() {
      this.isSelectedImageLoading = true;
      this.selectedCategoryImage = this.selectedCategoryImageURL;
    },
    checkSelectedImageValidation() {
      if ( !this.selectedCategory || this.selectedCategory === 'disabled-option' ) return
      const { photoURL } = this.categories.find((c) => c.id === this.selectedCategory);
      this.selectedCategoryImage = photoURL;
      this.selectedCategoryImageURL = photoURL;
      this.SHOW_ERROR("Invalid image url");
      this.isSelectedImageLoading = false;
    },
    async updateSelectedCategory() {
      if (!this.selectedCategory || this.selectedCategory === "disabled-option") {
        this.SHOW_ERROR("You've not choosen a category");
        return;
      }

      this.isLoading = true;

      await this.updateCategory({
        id: this.selectedCategory,
        title: this.selectedCategoryTitle,
        photoURL: this.selectedCategoryImage,
      });

      this.categories = await this.fetchCategories()

      this.SHOW_SUCCESS("Category is updated");

      this.isLoading = false;
    },
    changeSelectedImage() {
      this.selectedCategoryImage = this.selectedCategoryImageURL;
      this.isSelectedImageLoading = false;
    },
  },
  async created() {
    this.isLoading = true;
    this.categories = await this.fetchCategories();
    this.isLoading = false;
  },
};
</script>
