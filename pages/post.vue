<template>
<div>
    <menu-s></menu-s>
    <ul>
        <li v-for="item in posts">
            <router-link :to="`/item/${item.id}`">{{ item.title }}!</router-link>
        </li>
    </ul>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import menuS from '~components/menu.vue'
export default {
    name: 'post',
    serverCacheKey() {
        return Math.floor(Date.now() / 100000)
    },
    async fetch({ store }) {
        if (store.state.post.lists.length > 0) return
        await store.dispatch('post/get')
    },
    computed: {
        ...mapGetters({
            posts: 'post/get'
        })
    },
    head() {
        return {
            title: 'cnode topics'
        }
    },
    components: {
        menuS
    }
}

</script>

<style scoped>
p {
    font-size: 20px;
    text-align: center;
    padding: 100px;
    padding-bottom: 0;
}

</style>
