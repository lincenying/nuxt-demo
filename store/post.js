import axios from 'axios'

export const state = {
    lists: []
}

export const actions = {
    async get({commit}) {
        const {data: { data }} = await axios.get('https://cnodejs.org/api/v1/topics')
        commit('set', data)
    }
}

export const mutations = {
    set(state, payload) {
        state.lists = payload
    }
}

export const getters = {
    ['get'](state) {
        return state.lists
    }
}
