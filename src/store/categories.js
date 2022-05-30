import { getAuth } from 'firebase/auth'
import { getFirestore , collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where, getDoc } from "firebase/firestore";

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
                const auth = getAuth()
                const db = getFirestore()
                const result = await addDoc(collection(db, "categories"), {
                    title,
                    creator_id: auth.currentUser.uid
                });
            } catch (e) {
                console.log(e)
            } 
        },
        async updateCategory({commit}, {id, ...updatedCategory}) {
            try {
                await updateDoc(doc(getFirestore(), 'categories', id), updatedCategory)
            } catch(e) {
                console.log(e)
            }
        },
        async removeCategory({commit}, {id}) {
            try {
                await deleteDoc(doc(getFirestore(), "categories", id));
            } catch(e) {
                console.log(e)
            }
        },
        async fetchCategories({commit}) {
            try {
                const db = getFirestore()
                const categoriesSnapshot = await getDocs(query(collection(db, "categories")))
                const receivedCategories = []
                categoriesSnapshot.forEach((doc) => {
                    receivedCategories.push({id: doc.id, ...doc.data()})
                });
                commit('setCategories', receivedCategories)
            } catch(e) {
                console.log(e)
            }
        },
        async fetchCategoryByID(ctx, id) {
            try {
                const category = await getDoc( doc( getFirestore(), 'categories', id ) )

                if ( category.exists() ) return category.data()

                return null
            } catch(e) {
                console.log(e)
                return null
            }
        }
    }
}