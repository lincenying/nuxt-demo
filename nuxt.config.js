module.exports = {
    build: {
        vendor: ['axios'],
        ssr: {
            cache: require('lru-cache')({
                max: 1000,
                maxAge: 1000 * 60 * 15
            })
        }
    },
    cache: {
        max: 1000,
        maxAge: 900000
    },
    css: [
        'assets/main.css',
        'element-ui/packages/theme-default/lib/index.css'
    ],
    loading: {
        color: '#4FC08D',
        failedColor: '#bf5050',
        duration: 1500
    }
}
