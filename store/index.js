import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        counter: 0
    },
    mutations: {
        increment(state) {
            state.counter++
        }
    },
    modules: {
        lists: {
            namespaced: true,
            state: {
                lists: []
            },
            actions: {
                async get({commit}) {
                    const {data: { data }} = await axios.get('https://cnodejs.org/api/v1/topics')
                    commit('set', data)
                }
            },
            mutations: {
                set(state, payload) {
                    state.lists = payload
                }
            }
        }
    }
})

export default store
