<template>
  <select 
    class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-if="disabledOption" value="disabled-option" disabled selected>{{disabledOption}}</option>
    <option
      v-for="option in options" 
      :key="option.id"
      :value="option[valueField]"
    >
      {{option.title}}
    </option>
  </select>
</template>
<script>
export default {
  name: 'Selection',
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    modelValue: {
      type: String,
    },
    disabledOption: {
      type: String,
    },
    valueField: {
      type: String,
      required: true
    }
  },
}
</script>