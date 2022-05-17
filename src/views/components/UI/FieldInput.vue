<template>
  <input
    type="text"
    ref="input"
    class="px-2 border rounded hover:border-gray-300 outline-blue-600 outline-1"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script>
export default {
  name: "FieldInput",
  props: ["placeholder", "modelValue"],
  methods: {
    focus() {
      this.$refs.input.focus()
    }
  },
};
</script>
