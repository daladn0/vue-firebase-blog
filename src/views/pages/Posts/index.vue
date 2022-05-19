<template>
    <div class="space-y-8">
        <PostItem v-for="i of 5" :key="i"/>
    </div>
</template>
<script>
import PostItem from '@views/pages/Posts/components/PostItem.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'PostsList',
    computed: {
        ...mapGetters('auth', ['user', 'isDataLoading', 'isLoggedIn']),
    },
    components: {
        PostItem
    }
}
</script>
