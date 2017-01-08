<template>
<div>
    <menu-s></menu-s>
    <ul>
        <li v-for="item in post">
            <router-link :to="`/item/${item.id}`">{{ item.title }}!</li>
    </ul>
</div>

</template>

<script>
import menuS from '~components/menu.vue'
export default {
    name: 'post',
    serverCacheKey() {
        return Math.floor(Date.now() / 100000)
    },
    async fetch({ store }) {
        await store.dispatch('lists/get')
    },
    computed: {
        post() {
            return this.$store.state.lists.lists
        }
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
