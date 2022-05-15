import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

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
            console.log(email, password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredential)
        },
        async logout() {
            await signOut(getAuth())
        }
    },
}