<template>
  <div class="h-full">
    <Modal v-if="showModal" @close="showModal = false">

    </Modal>

    <div class="h-full" @click="showModal = true">
      <button v-if="!preview" type="button" class="leading-10 w-10 h-10 bg-gray-100 rounded-full text-gray-400 transition-all hover:bg-gray-200">
        <svg class="w-5 h-5 mx-auto">
          <use xlink:href="@/assets/svg/sprite.svg#photo" />
        </svg>
      </button>

      <div v-else class="h-full w-20 overflow-hidden cursor-pointer">
        <img class="w-full h-full object-cover" :src="preview" />
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/views/components/UI/Modal.vue";
export default {
  name: "UploadImage",
  props: ['modelValue'],
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      preview: this.modelValue,
    }
  }
};
</script>
