<template>
<div class="item">
    <menu-s></menu-s>
    <div v-html="data.content"></div>
    <ul>
        <li v-for="(item, index) in data.replies">
            <h5>第 {{ index + 1 }} 楼: {{ item.author.loginname }}</h5>
            <div v-html="item.content"></div>
        </li>
    </ul>
</div>
</template>

<script>
/*eslint no-inline-comments: "off"*/
import api from 'apiConfig'
import menuS from '@/components/menu.vue'
export default {
    async asyncData(connext) {
        const { params, error /* , req, res, isClient, isDev, isServer, query, redirect, route, store */ } = connext
        try {
            const { data } = await api.get(`https://cnodejs.org/api/v1/topic/${params.id}`, {}, {...connext, xhrCache: true})
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
