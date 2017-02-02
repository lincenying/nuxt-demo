import Vue from 'vue'
import ls from 'store2'

export const scrollTo = path => {
    var clientHeight = document.documentElement.clientHeight,
        scrollTop = ls.get(path)
    if (scrollTop) {
        Vue.nextTick().then(() => {
            if (document.documentElement.offsetHeight >= scrollTop + clientHeight) {
                window.scrollTo(0, scrollTop)
            }
            ls.remove(path)
        })
    }
}

export const scrollSave = path => {
    const scrollTop = document.body.scrollTop
    if (scrollTop) ls.set(path, scrollTop)
    else ls.remove(path)
}
