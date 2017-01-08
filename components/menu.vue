<template>
<div>
    <p>
        vue-router:
        <router-link to="/">index</router-link> | 
        <router-link to="/post">posts</router-link>
    </p>
</div>
</template>

<script>
export default {
    name: 'menu',
    serverCacheKey () {
        return 'menu'
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
