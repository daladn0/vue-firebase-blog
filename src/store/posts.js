import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, doc, getDoc, orderBy, query, updateDoc, snapshotEqual } from "firebase/firestore";

export default {
    namespaced: true,
    state: () => ({
        posts: []
    }),
    getters: {
        posts: state => state.posts
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        addPost(state, post) {
            state.posts.push(post)
        }
    },
    actions: {
        async createPost({ commit }, { description, title = '', photoURL = '', category_id = '' }) {
            try {
                const db = getFirestore()
                const newPost = {
                    title,
                    description,
                    photoURL,
                    category_id,
                    timestamp: serverTimestamp(),
                    creator_id: getAuth().currentUser.uid
                }
                const { id } = await addDoc(collection(db, "posts"), newPost)

                await updateDoc(doc(db, 'posts', id), {
                    id
                })

                return true
            } catch (e) {
                console.log(e)
            }
        },
        async fetchPosts({ commit, rootState }) {
            try {
                const db = getFirestore()
                const postsSnapshot = await getDocs(query(collection(db, "posts"), orderBy('timestamp')))
                const receivedPosts = []
                postsSnapshot.forEach((doc) => {
                    receivedPosts.push({ id: doc.id, ...doc.data() })
                });
                commit('setPosts', receivedPosts)

            } catch (e) {
                console.log(e)
            }
        },
        async fetchSinglePostByID(ctx, id) {
            try {
                const snapshot = await getDoc( doc(getFirestore(), 'posts', id) )
                if (snapshot.exists()) return snapshot.data()
                return null
            } catch (e) {
                console.log(e)
                return null
            }
        }
    }
}