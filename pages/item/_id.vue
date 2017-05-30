<template>
<div>
    <menu-s></menu-s>
    <div v-html="data.content"></div>
</div>
</template>

<script>
/*eslint no-inline-comments: "off"*/
import api from 'apiConfig'
import menuS from '~components/menu.vue'
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
