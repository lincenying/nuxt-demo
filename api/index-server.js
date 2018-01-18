import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from '~/api/config-server'

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    api: null,
    cookies: {},
    setCookies(value) {
        value = value || {}
        this.cookies = value
        this.api = axios.create({
            baseURL: config.api,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie: parseCookie(value)
            },
            timeout: config.timeout,
        })
    },
    post(url, data, context) {
        if (!this.api) this.setCookies()
        const cookies = this.cookies
        const username = cookies.username || ''
        const key = md5(url + JSON.stringify(data) + username)
        if (config.cached && context.xhrCache && config.cached.has(key)) {
            console.log('命中缓存')
            return Promise.resolve(config.cached.get(key))
        }
        return this.api({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then(res => {
            if (config.cached && context.xhrCache) config.cached.set(key, res)
            return res
        })
    },
    get(url, params, context) {
        if (!this.api) this.setCookies()
        const cookies = this.cookies
        const username = cookies.username || ''
        const key = md5(url + JSON.stringify(params) + username)
        if (config.cached && context.xhrCache && config.cached.has(key)) {
            console.log('命中缓存')
            return Promise.resolve(config.cached.get(key))
        }
        return this.api({
            method: 'get',
            url,
            params,
        }).then(res => {
            if (config.cached && context.xhrCache) config.cached.set(key, res)
            return res
        })
    }
}
