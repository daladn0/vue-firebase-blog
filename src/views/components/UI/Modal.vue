<template>
  <div
    class="flex items-center justify-center w-screen h-screen fixed inset-0 bg-black z-50 bg-opacity-70"
    @click.self="$emit('close')"
  >
    <div>
      <h3
        v-if="heading"
        class="text-center text-2xl font-bold mb-2.5 text-white"
      >
        {{ heading }}
      </h3>
      <div class="block w-md p-4 rounded-xl bg-white">
        <slot />
      </div>
    </div>

    <button
      class="absolute top-6 right-6 cursor-pointer text-white p-2 rounded-md bg-black bg-opacity-0 transition-all hover:bg-opacity-50"
      @click="$emit('close')"
    >
      <svg class="w-6 h-6" >
        <use xlink:href="@/assets/svg/sprite.svg#close" />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: "ModaWindow",
  props: ["heading"],
};
</script>
