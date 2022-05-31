import { getAuth } from 'firebase/auth'
import { getFirestore , collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where, getDoc, serverTimestamp, orderBy, limit } from "firebase/firestore";

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
        async createCategory({ commit }, { title, photoURL }) {
            try {
                const auth = getAuth()
                const db = getFirestore()
                const result = await addDoc(collection(db, "categories"), {
                    title,
                    photoURL,
                    creator_id: auth.currentUser.uid,
                    timestamp: serverTimestamp(),
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
                return receivedCategories
            } catch(e) {
                console.log(e)
            }
        },
        async fetchCategoryByID({commit}, id) {
            try {
                const category = await getDoc( doc( getFirestore(), 'categories', id ) )

                if ( category.exists() ) return category.data()

                return null
            } catch(e) {
                console.log(e)
                return null
            }
        },
        async fetchCategoryByTitle({commit}, title) {
            try  {
                const q = query(collection(getFirestore(), "categories"), where("title", "==", title));
                const querySnapshot = await getDocs(q);
                let category = null
                querySnapshot.forEach( item => {
                    category = {...item.data(), id: item.id}
                } )
                return category
            } catch(e) {
                console.log(e)
                return null
            }
        },
        async fetchLimitedCategories({commit}, {limit:countLimit = 5, order = 'timestamp'}) {
            try {
                const q = query(collection( getFirestore(), 'categories' ), orderBy(order, "desc"), limit(countLimit))
                const docSnap = await getDocs(q)
                const categories = []
                docSnap.forEach( doc => {
                    if ( doc.exists() ) {
                        categories.push(doc.data())
                    }
                } )
                return categories

            } catch(e) {
                console.log(e)
                return null
            }
        }
    }
}