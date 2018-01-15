import api from '~api'

export const state = () => ({
    counter: 0
})

export const mutations = {
    increment(state) {
        state.counter++
    }
}

export const actions = {
    // 在服务端渲染每一页之前，nuxtServerInit 都会被 Nuxt.js 调用
    nuxtServerInit(store, context) {
        const { req } = context
        api.setCookies(req && req.headers.cookie)
    },
}
