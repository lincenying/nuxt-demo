<template>
<div>
    <menu-s></menu-s>
    <ul>
        <li v-for="item in posts">
            <router-link :to="`/item/${item.id}`">{{ item.title }}!</router-link>
        </li>
        <li><a @click="nextPage" href="javascript:;">加载下一页</a></li>
    </ul>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import { scrollTo, scrollSave } from '~plugins/utils'
import menuS from '~components/menu.vue'

export default {
    name: 'post',
    serverCacheKey() {
        return Math.floor(Date.now() / 100000)
    },
    asyncData({ isClient }) {
        return { isClient, date: Date.now() }
    },
    async fetch(context) {
        const store = context.store
        await store.dispatch('post/get', { context })
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
    },
    methods: {
        nextPage() {
            const params = {
                page: this.$store.state.post.page + 1
            }
            this.$store.dispatch('post/get', {params})
        }
    },
    mounted() {
        if (this.isClient) scrollTo(this.$route.path)
    },
    beforeRouteLeave(to, from, next) {
        scrollSave(from.path)
        next()
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
