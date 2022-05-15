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
            if(user) {
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
        async login({commit}, { email, password }) {
            commit('setIsDataLoading', true)
            const auth = getAuth()
            await signInWithEmailAndPassword(auth, email, password)
            commit('setIsDataLoading', false)
        },
        async logout({commit}) {
            commit('setIsDataLoading', true)
            await signOut(getAuth())
            commit('setIsDataLoading', false)
        },
        async signup({commit}, { email, password, name }) {
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
            commit('setIsDataLoading', false)
        }
    },
}