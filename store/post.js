import api from '~api'

export const state = () => ({
    page: 1,
    lists: []
})

export const actions = {
    async get({commit, state}, {params = {}, context}) {
        const page = params.page || 1
        if (state.lists.length > 0 && page === 1) return
        const {data: { data }} = await api.get('https://cnodejs.org/api/v1/topics', params, {...context, xhrCache: true})
        commit('set', { data, page, })
    }
}

export const mutations = {
    set(state, payload) {
        state.lists = state.lists.concat(payload.data)
        state.page = payload.page
    }
}

export const getters = {
    ['get'](state) {
        return state.lists
    }
}
