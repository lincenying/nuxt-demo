import axios from 'axios'

export const state = {
    page: 1,
    lists: []
}

export const actions = {
    async get({commit}, params = {}) {
        const {data: { data }} = await axios.get('https://cnodejs.org/api/v1/topics', { params })
        commit('set', {
            data,
            page: params.page || 1
        })
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
