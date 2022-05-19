import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
export default {
    namespaced: true,
    state: () => ({
        user: {},
        isLoggedIn: false,
        isDataLoading: false,
    }),
    getters: {
        user: state => state.user,
        isLoggedIn: state => state.isLoggedIn,
        isDataLoading: state => state.isDataLoading
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
        }
    },
    actions: {
        async login({commit}, { email, password }) {
            try {
                commit('setIsDataLoading', true)
                const auth = getAuth()
                const userCreds = await signInWithEmailAndPassword(auth, email, password)
                return userCreds
            } catch(e) {
                console.log(e)
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