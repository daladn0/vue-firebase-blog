import { getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

export default {
  namespaced: true,
  state: () => ({
    posts: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async createPost(ctx, { title = "", image = "", description = "" }) {
      try {
        const db = getFirestore();
        const auth = getAuth()
        const newPost = {
          title,
          description,
          image: image,
          creator_id: auth.currentUser.uid,
          createdAt: serverTimestamp()
        }
        await addDoc(collection(db, "posts"), newPost);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
