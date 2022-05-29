<template>
  <div>
    <Modal v-if="showModal" @close="closeModal">
      <form @submit.prevent="setPostPhoto" class="flex items-stretch">
        <FieldInput
          v-focus
          class="w-96 py-2"
          placeholder="Image URL"
          v-model="imageURL"
        />
        <MainButton
          type="submit"
          class="ml-4"
        >
          submit
        </MainButton>
      </form>
    </Modal>
    <Form
      ref="form"
      @submit="createQuickPost"
      class="w-full h-fit flex items-start justify-between space-x-4 p-2 bg-white rounded-lg"
    >
      <div @click="showModal = true" class="h-10 transition-all">
        <button
          v-if="!preview"
          type="button"
          class="flex flex-shrink-0 items-center justify-center w-10 h-10 bg-gray-200 rounded-full transition-all hover:bg-gray-300"
        >
          <svg class="w-6 h-6 text-gray-500">
            <use xlink:href="sprite.svg#photo" />
          </svg>
        </button>

        <div class="w-20 h-full border cursor-pointer relative" v-else>
          <img class="w-full h-full object-contain" @error="checkImageValidation" :src="preview" alt="" />

          <button
            @click.stop="removePostPhoto"
            type="button"
            class="p-1 bg-red-500 rounded-full absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 transition-all hover:bg-red-600"
          >
            <svg class="w-4 h-4 text-white">
              <use xlink:href="sprite.svg#close" />
            </svg>
          </button>
        </div>
      </div>

      <Field name="post-description" :rules="titleValidation" v-slot="{ field, errors, meta }" >
        <div class="flex flex-col w-full">
          <FieldInput
            v-bind="field"
            ref="quick-post-title"
            placeholder="Create Post"
            class="w-full h-10"
            v-model="description"
          />
          <span v-if="errors[0] && meta.touched" class="block mt-1 text-sm text-red-500">{{errors[0]}}</span>
        </div>
      </Field>

      <Spinner v-if="isDataLoading" class="w-10 h-10" />
      <button
        v-else
        type="submit"
        class="flex flex-shrink-0 ml-auto items-center justify-center w-10 h-10 bg-blue-500 rounded-lg transition-all hover:bg-blue-600"
      >
        <svg class="w-6 h-6 text-white">
          <use xlink:href="sprite.svg#send" />
        </svg>
      </button>
    </Form>
  </div>
</template>
<script>
import Modal from "@views/components/common/Modal.vue";
import { mapActions } from "vuex";
import { Form, Field } from "vee-validate";
import { string, required } from 'yup'

export default {
  name: "QuickPost",
  components: {
    Modal,
    Form,
    Field
  },
  data() {
    return {
      showModal: false,
      preview: "",
      imageURL: "",
      description: "",
      titleValidation: string().required('Description field is required'),
      isDataLoading: false,
      invalidImg: false
    };
  },
  methods: {
    ...mapActions('posts', ['createPost']),
    ...mapActions('toast', ['SHOW_ERROR']),
    async createQuickPost() {
      this.isDataLoading = true
      const newPost = {
        description: this.description,
        photoURL: this.preview
      }

      this.$refs['form'].resetForm()
      this.description = ''
      this.preview = ''

      await this.createPost(newPost)
      this.isDataLoading = false
    },
    setPostPhoto() {
      this.preview = this.imageURL;
      this.closeModal();
      this.$refs["quick-post-title"].focus();
    },
    removePostPhoto() {
      this.preview = "";
      this.$refs["quick-post-title"].focus();
    },
    closeModal() {
      this.showModal = false;
      this.imageURL = "";
    },
    checkImageValidation() {
      if ( !this.preview ) return
      this.SHOW_ERROR('Invalid image url!')
      this.preview = ''
      this.imageURL = ''
    }
  },
};
</script>
