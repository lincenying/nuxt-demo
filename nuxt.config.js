module.exports = {
    build: {
        vendor: ['axios']
    },
    cache: true,
    css: [
        'assets/main.css'
    ],
    loading: {
        color: '#4FC08D',
        failedColor: '#bf5050',
        duration: 1500
    },
    router: {
        routes: [{
            name: 'item',
            path: '/item/:id',
            component: 'pages/_item.vue'
        }]
    }
}
