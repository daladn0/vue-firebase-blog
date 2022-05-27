<template>
  <Spinner v-if="isLoading" class="mx-auto mt-4" />
  <div v-else class="max-w-xl mx-auto">
    <Form 
      @submit="createNewPost"
      @invalid-submit="$refs['post-description'].focus()"
      class="space-y-8"
    >
      <div>
        <label for="email" class="block mb-2 font-medium text-gray-900">Post title</label>
        <FieldInput 
          v-model="postTitle"
          class="w-full py-2.5" 
          placeholder="Post Title"
        />
      </div>
      <div>
        <Field :rules="descriptionValidation" name="postDescription" v-slot="{field, errors}" >
          <label for="email" class="block mb-2 font-medium text-gray-900">Post description</label>
          <textarea
            ref="post-description"
            v-bind="field"
            v-model.lazy="postDescription"
            class="w-full py-2 transition-all px-2 outline-none border border-gray-300 hover:border-gray-400 focus:border-gray-500 rounded-lg resize-none"
            placeholder="Post Description"
          />
          <span v-if="errors[0]" class="text-red-500 text-sm" >{{errors[0]}}</span>
        </Field>
      </div>

      <div>
        <label for="email" class="block mb-2 font-medium text-gray-900">Post category</label>
        <Selection 
          v-model="selectedCategory"
          disabledOption="Choose category"
          :options="categories"
          value-field="id"
        />
      </div>
      <div>
        <label class="block mb-2 font-medium text-gray-900">Post picture url</label>
        <div class="flex items-center justify-between space-x-4">
          <FieldInput 
            v-model="imageURL" 
            class="w-full py-2.5" 
            placeholder="example.com/picture.png"
            @input="postImage = false; invalidURL = false"
          />
          <MainButton type="button" @click="postImage = imageURL" >
            Submit
          </MainButton>
        </div>
        <img v-if="invalidURL" src="@/assets/images/fallback.png" class="w-full h-full mt-8 aspect-video object-cover" alt="" />
        <img v-else-if="postImage" class="w-full h-full mt-8 aspect-video object-cover" @error="invalidURL = true" :src="postImage" alt="">
      </div>
      <MainButton type="submit">
        Create Post
      </MainButton>
    </Form>
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import { mapGetters, mapActions } from "vuex";
import { string, required } from 'yup'

export default {
  name: "Create Post",
  components: {
    Form,
    Field,
  },
  data() {
    return {
      isLoading: false,
      postTitle: '',
      postDescription: '',
      selectedCategory: 'disabled-option',
      postImage: '',
      invalidURL: false,
      imageURL: '',
      descriptionValidation: string().required("Post description can't be empty!")
    }
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('posts', ['createPost']),
    setImage() {
      this.invalidURL = false
      this.postImage = this.imageURL
    },
    async createNewPost () {
      this.isLoading = true

      const currentCategory = this.selectedCategory === 'disabled-option' ? '' : this.selectedCategory

      await this.createPost({
        title: this.postTitle,
        description: this.postDescription,
        photoURL: this.postImage,
        category_id: currentCategory
      })

      this.postImage = ''
      this.imageURL = ''
      this.postTitle = ''
      this.postDescription = ''
      this.selectedCategory = 'disabled-option'

      this.$router.push('/')

      this.isLoading = false
    },
  },
  async created() {
    this.isLoading = true
    await this.fetchCategories()
    this.isLoading = false    
  }
};
</script>
