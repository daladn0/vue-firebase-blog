<template>
  <div class="h-full">
    <Modal v-if="showModal" @close="showModal = false">
      <div class="flex items-center">
        <FieldInput
          placeholder="Create quick post"
          class="py-1.5 mr-2 w-96"
          v-model="imageURL"
          @keydown.enter.prevent="submit"
          @keydown.esc.prevent="
            showModal = false;
            imageURL = '';
          "
          id="url"
        />
        <button
          @click="submit"
          type="button"
          class="relative bg-blue-500 text-white px-4 py-1 rounded text-lg font-bold overflow-visible"
        >
          Submit
        </button>
      </div>
    </Modal>

    <div class="h-full" @click="openModal">
      <button
        v-if="!modelValue"
        type="button"
        class="leading-10 w-10 h-10 bg-gray-100 rounded-full text-gray-400 transition-all hover:bg-gray-200"
      >
        <svg class="w-5 h-5 mx-auto">
          <use xlink:href="@/assets/svg/sprite.svg#photo" />
        </svg>
      </button>
      

      <div v-else class="h-full w-20 cursor-pointer border relative">
        <img class="w-full h-full object-contain" :src="modelValue" />

        <button type="button" @click.stop="$emit('update:modelValue', '')" class="absolute top-1 right-1">
          <svg class="w-4 h-4 bg-red-500 rounded-full text-white transform translate-x-1/2 -translate-y-1/2">
            <use xlink:href="@/assets/svg/sprite.svg#close" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/views/components/UI/Modal.vue";
import FieldInput from "./FieldInput.vue";

export default {
  name: "UploadImage",
  props: ["modelValue"],
  components: {
    Modal,
    FieldInput,
  },
  data() {
    return {
      showModal: false,
      imageURL: "",
    };
  },
  methods: {
    submit() {
      this.showModal = false;
      this.$emit("update:modelValue", this.imageURL);
      this.imageURL = ''
    },
    openModal() {
      this.showModal = true
      setTimeout( () => {
        document.querySelector('#url').focus()
      } )
    }
  },
};
</script>
