export default {
    namespaced: true,
    state: () => ({
        message: '',
        visible: false,
        status: 'success',
    }),
    getters: {
        status: state => state.status,
        message: state => state.message,
        visible: state => state.visible
    },
    mutations: {
        setVisible(state, visibility) {
            state.visible = visibility
        },
        setMessage(state, message) {
            state.message = message
        },
        setStatus(state, payload) {
            state.status = payload
        }
    },
    actions: {
        SHOW_ERROR({commit}, message) {
            commit('setVisible', false)
            commit('setStatus', 'error')
            commit('setMessage', message)
            commit('setVisible', true)
        },
        SHOW_SUCCESS({commit}, message) {
            commit('setVisible', false)
            commit('setStatus', 'success')
            commit('setMessage', message)
            commit('setVisible', true)
        },
        CLEAR_TOASTS({commit}) {
            commit('setVisible', false)
            commit('setMessage', '')
        }
    }
}