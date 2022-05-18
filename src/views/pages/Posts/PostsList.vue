<template>
    <div class="space-y-8">
        <PostItem v-for="i of 5" :key="i"/>
    </div>
</template>
<script>
import PostItem from '@views/pages/Posts/PostItem.vue'
export default {
    name: 'PostsList',
    components: {
        PostItem
    }
}
</script>
