<template>
  <div>
    <form
      @submit.prevent="createQuickPost"
      class="flex items-center justify-between p-2 w-full max-h-14 h-14 bg-white rounded-xl space-x-4"
    >
      <UploadImage v-model="postImage" />
      <FieldInput
        class="w-full h-full"
        ref="title"
        placeholder="Create quick post"
        v-model="postDescription"
        @keydown.enter.prevent="createQuickPost"
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
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import UploadImage from "./UI/UploadImage.vue";
import FieldInput from "@/views/components/UI/FieldInput.vue";

export default {
  name: "QuickPost",
  data() {
    return {
      postDescription: "",
      postImage: "",
      isLoading: false,
    };
  },
  components: {
    UploadImage,
    FieldInput,
},
  methods: {
    ...mapActions("posts", ["createPost"]),
    async createQuickPost() {
      this.isLoading = true;

      const quickPost = {
        description: this.postDescription,
        image: this.postImage,
      };

      this.postDescription = "";
      this.postImage = "";

      await this.createPost(quickPost);
      this.isLoading = false;
    }
  },
};
</script>
