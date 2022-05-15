import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'

export default {
    namespaced: true,
    state: {
        user: {},
        isLoggedIn: false
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
        }
    },
    actions: {
        async login(ctx, { email, password }) {
            const auth = getAuth()
            await signInWithEmailAndPassword(auth, email, password)
        },
        async logout() {
            await signOut(getAuth())
        },
        async signup({commit}, { email, password, name }) {
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
        }
    },
}