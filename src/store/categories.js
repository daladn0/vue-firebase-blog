import { getAuth } from 'firebase/auth'
import { getFirestore , collection, doc, addDoc,  updateDoc, deleteDoc} from "firebase/firestore";

export default {
    namespaced: true,
    state: () => ({
        categories: [],
    }),
    getters: {
        categories: state => state.categories
    },
    mutations: {
        setCategories(state, categories){
            state.categories = categories
        }
    },
    actions: {
        async createCategory({ commit }, { title }) {
            try {
                commit('auth/setError', null, { root: true })
                commit('auth/setIsDataLoading', true, { root: true })

                const auth = getAuth()
                const db = getFirestore()
                await addDoc(collection(db, "categories"), {
                    title,
                    creator_id: auth.currentUser.uid
                });
            } catch (e) {
                console.log(e)
                commit('auth/setError', e.code, { root: true })
            } finally {
                commit('auth/setIsDataLoading', false, { root: true })
            }
        },
        async updateCategory({commit}, {id, ...updatedCategory}) {
            try {
                commit('auth/setError', null, { root: true })
                commit('auth/setIsDataLoading', true, { root: true })
                await updateDoc(doc(getFirestore(), 'categories', id), updatedCategory)
            } catch(e) {
                console.log(e)
            } finally {
                commit('auth/setIsDataLoading', false, { root: true })
            }
        },
        async removeCategory({commit}, {id}) {
            try {
                commit('auth/setError', null, { root: true })
                commit('auth/setIsDataLoading', true, { root: true })
                await deleteDoc(doc(getFirestore(), "categories", id));
            } catch(e) {
                console.log(e)
            } finally {
                commit('auth/setIsDataLoading', false, { root: true })
            }
        }
    }
}