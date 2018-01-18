const join = require('path').join

module.exports = {
    render: {
        bundleRenderer: {
            cache: require('lru-cache')({
                max: 1000,
                maxAge: 1000 * 60 * 15
            })
        }
    },
    build: {
        vendor: ['axios'],
        extend(config, { isClient }) {
            if (isClient) {
                config.resolve.alias['~api'] = join(__dirname, 'api/index-client.js')
            } else {
                config.resolve.alias['~api'] = join(__dirname, 'api/index-server.js')
            }
        },
        extractCSS: true,
        babel: {
            plugins: [
                [ "component", {
                    "libraryName": "element-ui",
                    "styleLibraryName": "theme-chalk"
                }]
            ]
        }
    },
    cache: {
        max: 1000,
        maxAge: 900000
    },
    css: [
        '~/assets/main.css',
        'element-ui/packages/theme-chalk/lib/table.css',
        'element-ui/packages/theme-chalk/lib/table-column.css',
        'element-ui/packages/theme-chalk/lib/tag.css',
    ],
    loading: {
        color: '#4FC08D',
        failedColor: '#bf5050',
        duration: 1500
    },
    plugins: ['~/plugins/element']
}
