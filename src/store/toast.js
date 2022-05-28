export default {
    namespaced: true,
    state: () => ({
        message: '',
        visible: false,
    }),
    getters: {
        message: state => state.message,
        visible: state => state.visible
    },
    mutations: {
        setVisible(state, visibility) {
            state.visible = visibility
        },
        setMessage(state, message) {
            state.message = message
        }
    },
    actions: {
        SHOW_ERROR({commit}, message) {
            commit('setMessage', message)
            commit('setVisible', true)
        },
        CLEAR_TOASTS({commit}) {
            commit('setVisible', false)
            commit('setMessage', '')
        }
    }
}