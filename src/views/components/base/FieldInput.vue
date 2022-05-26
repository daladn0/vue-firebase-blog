<template>
    <input 
        ref="field"
        :placeholder="placeholder"
        type="text"
        class="transition-all px-2 outline-none border border-gray-300 hover:border-gray-400 focus:border-gray-500 rounded-lg"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
<script>
export default {
    name: 'FieldInput',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        }
    },
    methods: {
        focus() {
            this.$refs['field'].focus()
        },
        blur() {
            this.$refs['field'].blur()
        }
    }
}
</script>