import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredential)
        }
    },
}