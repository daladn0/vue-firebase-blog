<template>
    <div class="w-full h-screen flex items-center justify-center relative">
        <router-link to="/" class="flex items-center px-4 py-2 text-blue-500 absolute top-4 left-4">
            <svg class="w-6 h-6">
                <use xlink:href="sprite.svg#arrow-left" />
            </svg>
            Go back
        </router-link>
        <slot />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "EmptyLayout",
    computed: {
        ...mapGetters("auth", ["isDataLoading"]),
    },
};
</script>
