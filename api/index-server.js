import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from '~/api/config-server'

export default {
    async post(url, data, context = {}) {
        const cookie = context.req && context.req.headers.cookie || ''
        const key = md5(url + JSON.stringify(data))
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        const res = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        })
        if (config.cached && context.xhrCache) config.cached.set(key, res)
        return res
    },
    async get(url, params, context = {}) {
        const cookie = context.req && context.req.headers.cookie || ''
        const key = md5(url + JSON.stringify(params))
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        const res = await axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie,
            }
        })
        if (config.cached && context.xhrCache) config.cached.set(key, res)
        return res
    }
}
