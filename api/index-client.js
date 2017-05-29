import axios from 'axios'
import qs from 'qs'
import config from '~/api/config-client'

axios.interceptors.request.use(config => config, error => Promise.reject(error))
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: ''
        }
    }
}

export default {
    post(url, data, context = {}) {
        console.log(context)
        return axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    get(url, params, context = {}) {
        console.log(context)
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus)
    }
}
