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
                config.resolve.alias['apiConfig'] = join(__dirname, 'api/index-client.js')
            } else {
                config.resolve.alias['apiConfig'] = join(__dirname, 'api/index-server.js')
            }
        }
    },
    cache: {
        max: 1000,
        maxAge: 900000
    },
    css: [
        'assets/main.css',
        'element-ui/packages/theme-default/lib/table.css',
        'element-ui/packages/theme-default/lib/table-column.css',
        'element-ui/packages/theme-default/lib/tag.css',
    ],
    loading: {
        color: '#4FC08D',
        failedColor: '#bf5050',
        duration: 1500
    }
}
