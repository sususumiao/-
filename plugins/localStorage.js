import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "ssr-username", // 读取本地存储的数据到store
        })(store)
    })
}