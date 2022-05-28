<template>
    <button class="p-2 rounded-full flex items-center justify-center bg-gray-300 transition-all hover:bg-gray-350">
          <svg class="w-6 h-6 text-gray-800 transition-all" viewBox="0 0 20 20">
            <use :xlink:href="`sprite.svg#${icon}`" />
          </svg>
    </button>
</template>
<script>
export default {
    name: 'ProfileButton',
    props: ['icon']
}
</script>