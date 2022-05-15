import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'

export default {
    namespaced: true,
    state: {
        user: {},
        isLoggedIn: false,
        isDataLoading: true,
    },
    mutations: {
        setUser(state, user) {
            if (user) {
                state.user = user
                state.isLoggedIn = true
            } else {
                state.user = {}
                state.isLoggedIn = false
            }
        },
        setIsDataLoading(state, payload) {
            state.isDataLoading = payload
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                commit('setIsDataLoading', true)
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, email, password)
            } catch (e) {
                return e
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async logout({ commit }) {
            try {
                commit('setIsDataLoading', true)
                await signOut(getAuth())
            } catch (e) {
                return e
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async signup({ commit }, { email, password, name }) {
            try {
                commit('setIsDataLoading', true)
                const auth = getAuth()
                await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(getAuth().currentUser, {
                    displayName: name,
                    photoURL: 'https://i1.sndcdn.com/artworks-000143494954-ebaw9g-t500x500.jpg'
                })

                const user = auth.currentUser

                commit('setUser', {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                })
            } catch(e) {
                return e
            } finally {
                commit('setIsDataLoading', false)
            }
        }
    },
}