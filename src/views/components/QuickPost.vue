<template>
  <div>
    <form
      @submit.prevent="createQuickPost"
      class="flex items-center justify-between p-2 w-full max-h-14 h-14 bg-white rounded-xl space-x-4 relative"
    >
      <UploadImage v-model="postImage" @update:modelValue="$refs.title.focus()" />
      <FieldInput
        class="w-full h-full"
        ref="title"
        placeholder="Create quick post"
        v-model="postDescription"
        @keydown.enter.prevent="createQuickPost"
        @blur="v$.$reset()"
      />

      <SpinnerLoading v-if="isLoading" />
      <button
        v-else
        type="submit"
        class="flex items-center justify-center flex-shrink-0 bg-blue-500 w-10 h-10 rounded-full text-white transition-all hover:bg-blue-600 outline-blue-900 outline-1"
      >
        <svg class="w-5" viewBox="0 0 24 24">
          <use xlink:href="@/assets/svg/sprite.svg#send" />
        </svg>
      </button>

      <span v-if="v$.postDescription.$dirty && v$.postDescription.required.$invalid"  class="absolute top-full left-1/2 transform translate-y-2 -translate-x-1/2 text-red-500 text-sm font-medium">This field can't be empty!</span>
      <span v-if="v$.postDescription.$dirty && v$.postDescription.minLength.$invalid"  class="absolute top-full left-1/2 transform translate-y-2 -translate-x-1/2 text-red-500 text-sm font-medium">Text can't be any shorter than {{v$.postDescription.minLength.$params.min}} symbols!</span>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import UploadImage from "./UI/UploadImage.vue";
import FieldInput from "@/views/components/UI/FieldInput.vue";
import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: "QuickPost",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      postDescription: "",
      postImage: "",
      isLoading: false,
    };
  },
  validations() {
    return {
      postDescription: { required, minLength: minLength(16) }
    }
  },
  components: {
    UploadImage,
    FieldInput,
  },
  methods: {
    ...mapActions("posts", ["createPost"]),
    async createQuickPost() {
      const isFormValid = await this.v$.$validate();

      if (!isFormValid) {
        this.v$.$touch();
        return;
      }

      this.isLoading = true;

      const quickPost = {
        description: this.postDescription,
        image: this.postImage,
      };

      this.postDescription = "";
      this.postImage = "";
      this.v$.$reset()

      await this.createPost(quickPost);
      this.isLoading = false;
    },
  },
};
</script>
