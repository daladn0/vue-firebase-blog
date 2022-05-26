<template>
  <div class="max-w-xl mx-auto">
    <Form class="space-y-8">
      <div>
        <label for="email" class="block mb-2 font-medium text-gray-900">Post title</label>
        <FieldInput class="w-full py-2.5" placeholder="Post Title" />
      </div>
      <div>
        <label for="email" class="block mb-2 font-medium text-gray-900"
          >Post description</label
        >
        <textarea
          class="w-full py-2 transition-all px-2 outline-none border border-gray-300 hover:border-gray-400 focus:border-gray-500 rounded-lg resize-none"
          placeholder="Post Title"
        />
      </div>
      <select
        class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
      >
        <option value="" disabled selected>Choose category</option>
        <option value="webdev" >
          Web development
        </option>
      </select>
      <div>
        <label for="email" class="block mb-2 font-medium text-gray-900">Post picture url</label>
        <FieldInput class="w-full py-2.5" placeholder="example.com/picture.png" />
        <div class="mt-8 aspect-video overflow-hidden border border-gray-300 bg-white">
            <img class="w-full h-full object-contain" src="https://www.geoguessr.com/seterra/images/system/kyiv.jpg" alt="">
        </div>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
      >
        Create Post
      </button>
    </Form>
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import FieldInput from "../../components/base/FieldInput.vue";
export default {
  name: "Create Post",
  components: {
    Form,
    Field,
    FieldInput,
  },
};
</script>
