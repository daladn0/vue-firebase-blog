<template>
  <div class="space-y-8">
    <div class="grid gap-8 grid-cols-2">
      <Form class="space-y-4">
        <Field name="new-category" v-slot="{ field, errors }">
          <div>
            <label
              for="new-category"
              class="text-2xl text-gray-900 font-medium block mb-2 dark:text-gray-300"
            >
              Add new category
            </label>
            <input
              v-bind="field"
              class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
              placeholder="Category title"
            />
            <span class="text-red-500 text-sm" v-if="errors[0] && meta.touched">{{
              errors[0]
            }}</span>
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

      <Form class="space-y-4">
        <div>
          <label for="new-category" class="text-2xl text-gray-900 font-medium block mb-2">
            Select category
          </label>
          <Field
            as="select"
            name="new-category"
            class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          >
            <option value="" disabled selected>Choose category</option>
            <option v-for="cat in cats" :key="cat" :value="cat">{{ cat }}</option>
          </Field>
        </div>

        <input
          class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
          placeholder="Category title"
        />

        <div class="w-full grid grid-cols-2 gap-4">
          <button
            v-if="true"
            type="submit"
            class="w-full py-2.5 font-semibold text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 rounded-lg px-5 text-center"
          >
            <Spinner class="block mx-auto" v-if="isDataLoading" />
            <span v-else>Update title</span>
          </button>
          <button
            v-if="true"
            type="submit"
            class="w-full font-semibold text-white outline-none bg-red-500 hover:bg-red-600 ring-red-700 focus:ring-2 rounded-lg px-5 text-center"
          >
            <Spinner class="block mx-auto" v-if="isDataLoading" />
            <span v-else>Remove category</span>
          </button>
        </div>
      </Form>
    </div>

    <div class="relative shadow-md">
      <div class="flex items-center absolute -left-4 top-0 transform -translate-x-full">
        <p class="block mr-4">Amount: </p>
        <select class="w-full p-2.5 pr-6 bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg">
          <option value="25" selected>25</option>
          <option value="50" >50</option>
          <option value="75" >75</option>
          <option value="100" >100</option>
        </select>
      </div>
      <PostsList/>
    </div>
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import PostsList from '@views/pages/Categories/components/PostsList.vue'
export default {
  name: "Categories",
  components: {
    Form,
    Field,
    PostsList,
  },
  data() {
    return {
      cats: ["Web development", "Programming", "Cooking", "Something awful"],
    };
  },
};
</script>
