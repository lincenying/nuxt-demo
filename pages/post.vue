<template>
<div>
    <menu-s></menu-s>
    <ul>
        <li v-for="item in post"><router-link :to="`/item/${item.id}`">{{ item.title }}!</li>
    </ul>
</div>
</template>

<script>
import menuS from '~components/menu.vue'
import axios from 'axios'
export default {
    name: 'post',
    serverCacheKey () {
        return Math.floor(Date.now() / 100000)
    },
    data() {
        // We can return a Promise instead of calling the callback
        return axios.get('https://cnodejs.org/api/v1/topics')
            .then(res => {
                return {
                    post: res.data.data
                }
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
