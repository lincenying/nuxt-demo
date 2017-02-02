<template>
<div>
    <menu-s></menu-s>
    <div v-html="data.content"></div>
</div>
</template>

<script>
/*eslint no-inline-comments: "off"*/
import axios from 'axios'
import menuS from '~components/menu.vue'
export default {
    async data({ params, error /* , req, res, isClient, isDev, isServer, query, redirect, route, store */ }) {
        try {
            const { data } = await axios.get(`https://cnodejs.org/api/v1/topic/${params.id}`)
            return data
        } catch(err) {
            error({
                message: 'Page not found',
                statusCode: 404
            })
        }
    },
    head() {
        return {
            title: this.data.title
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
    padding: 100px;
    padding-bottom: 0;
}
</style>
