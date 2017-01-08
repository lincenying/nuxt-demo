<template>
<div>
    <menu-s></menu-s>
    <p>{{ userAgent }}</p>
    <p>Vuex: {{ counter }} <a href="javascript:;" @click="increment">加1个</a></p>
</div>
</template>

<script>
import { mapState } from 'vuex'
import menuS from '~components/menu.vue'
export default {
    name: 'index',
    serverCacheKey () {
        // Will change every 100 secondes
        return Math.floor(Date.now() / 100000)
    },
    fetch({ store }) {
        store.commit('increment')
    },
    computed: mapState([
        'counter'
    ]),
    data({ req }, callback) {
        setTimeout(function() {
            // callback(err, data)
            callback(null, {
                userAgent: req ? req.headers['user-agent'] : navigator.userAgent
            })
        }, 100)
    },
    head() {
        return {
            title: 'index'
        }
    },
    components: {
        menuS
    },
    methods: {
        increment() {
            this.$store.commit('increment')
        }
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
