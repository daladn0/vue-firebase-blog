import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, updateDoc, doc } from 'firebase/firestore'

export default {
    namespaced: true,
    state: () => ({
        user: {},
        isLoggedIn: false,
        isDataLoading: false,
        error: null,
        users: []
    }),
    getters: {
        user: state => state.user,
        users: state => state.users,
        isLoggedIn: state => state.isLoggedIn,
        isDataLoading: state => state.isDataLoading,
        error: state => state.error
    },
    mutations: {
        setUser(state, user) {
            state.user = user

            if (!user) {
                state.isLoggedIn = false
                return
            }

            state.isLoggedIn = true
        },
        setUsers(state, users) {
            state.users = users
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
        async login({ commit }, { email, password }) {
            try {
                commit('setError', null)
                commit('setIsDataLoading', true)
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, email, password)

                return true
            } catch (e) {
                if (e && e.code) {
                    commit('setError', e.code)
                }
                return e
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async signup({ commit }, { name, email, password }) {
            try {
                commit('setIsDataLoading', true)
                await createUserWithEmailAndPassword(getAuth(), email, password)

                const { currentUser } = getAuth()

                await updateProfile(getAuth().currentUser, {
                    displayName: name,
                    photoURL: `https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`,
                })

                const res = await addDoc(collection(getFirestore(), "users"), {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                })

                await updateDoc(doc(getFirestore(), "users", res.id), {
                    documentID: res.id
                })

                return true

            } catch (e) {
                if (e && e.code) {
                    commit('setError', e.code)
                }
                return e
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async logout({ commit }) {
            try {
                commit('setIsDataLoading', true)
                const auth = getAuth()
                await signOut(auth)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async fetchUsers({ commit }) {
            try {
                const db = getFirestore()
                const usersSnapshot = await getDocs(query(collection(db, "users")))
                const receivedUsers = []
                usersSnapshot.forEach((doc) => {
                    receivedUsers.push({ ...doc.data() })
                });
                commit('setUsers', receivedUsers)
            } catch (e) {
                console.log(e)
            }
        },
        async updateUserName({ commit, state, dispatch }, updatedUserName) {
            try {
                commit('setIsDataLoading', true)

                await dispatch('fetchUsers')
                const currentUser = state.users.find(user => user.uid === getAuth().currentUser.uid)

                await updateProfile(getAuth().currentUser, { displayName: updatedUserName })
                await updateDoc(doc(getFirestore(), 'users', currentUser.documentID), {
                    displayName: updatedUserName
                })

            } catch (e) {
                console.log(e)
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async updateUserImage({ commit, state, dispatch }, updatedUserImageURL) {
            try {
                commit('setIsDataLoading', true)

                await dispatch('fetchUsers')
                const currentUser = state.users.find(user => user.uid === getAuth().currentUser.uid)

                await updateProfile(getAuth().currentUser, { photoURL: updatedUserImageURL })
                await updateDoc(doc(getFirestore(), 'users', currentUser.documentID), {
                    photoURL: updatedUserImageURL
                })

            } catch (e) {
                console.log(e)
            } finally {
                commit('setIsDataLoading', false)
            }
        },
        async sendPasswordResetLink({ commit, state }) {
            try {
                commit('setIsDataLoading', true)

                const auth = getAuth();
                await sendPasswordResetEmail(auth, state.user.email)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setIsDataLoading', false)
            }
        }
    }
}