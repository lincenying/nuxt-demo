import axios from 'axios'
import qs from 'qs'
import config from '~/api/config-server'

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
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        })
    },
    get(url, params, context = {}) {
        console.log(context)
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
    }
}
