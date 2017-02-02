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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ls from 'store2'
import menuS from '~components/menu.vue'
export default {
    name: 'post',
    serverCacheKey() {
        return Math.floor(Date.now() / 100000)
    },
    data({ isClient }) {
        return { isClient }
    },
    async fetch({ store, isClient, route: { path } }) {
        if (store.state.post.lists.length === 0) await store.dispatch('post/get')
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
            this.$store.dispatch('post/get', params)
        }
    },
    mounted() {
        if (this.isClient) {
            var clientHeight = document.documentElement.clientHeight,
                scrollTop = ls.get(this.$route.path)
            if (scrollTop) {
                Vue.nextTick().then(() => {
                    if (document.documentElement.offsetHeight >= scrollTop + clientHeight) {
                        window.scrollTo(0, scrollTop)
                    }
                    ls.remove(this.$route.path)
                })
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        const scrollTop = document.body.scrollTop
        const path = from.path
        if (scrollTop) ls.set(path, scrollTop)
        else ls.remove(path)
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
