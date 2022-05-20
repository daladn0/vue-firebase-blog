import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
export default {
    namespaced: true,
    state: () => ({
        user: {},
        isLoggedIn: false,
        isDataLoading: false,
        error: null,
    }),
    getters: {
        user: state => state.user,
        isLoggedIn: state => state.isLoggedIn,
        isDataLoading: state => state.isDataLoading,
        error: state => state.error
    },
    mutations: {
        setUser(state, user) {
            state.user = user

            if ( !user ) {
                state.isLoggedIn = false
                return
            }

            state.isLoggedIn = true
        },
        setIsDataLoading(state, payload) {
            state.isDataLoading = payload
        },
        setError(state, errorCode) {
            state.error = errorCode
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async login({commit}, { email, password }) {
            try {
                commit('setError', null)
                commit('setIsDataLoading', true)
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, email, password)
                return true
            } catch(e) {
                if ( e && e.code ) {
                    commit('setError', e.code)
                }
                return e
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async logout({commit}) {
            try {
                commit('setIsDataLoading', true)
                const auth = getAuth()
                await signOut(auth)
            } catch(e) {
                console.log(e)
            } finally {
                commit('setIsDataLoading', false)
            }
        }
    }
}