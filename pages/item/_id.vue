<template>
<div>
    <menu-s></menu-s>
    <div v-html="data.content"></div>
</div>
</template>

<script>
import menuS from '~components/menu.vue'
import axios from 'axios'
export default {
    data({ params, error }) {
        return axios.get(`https://cnodejs.org/api/v1/topic/${params.id}`)
            .then(res => res.data)
            .catch(() => {
                error({
                    message: 'Page not found',
                    statusCode: 404
                })
            })
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
