import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import axios from 'axios';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
let currentUser = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

const register = async (username, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setDoc(doc(db, 'users', res.user.uid), {
        username: username,
        email: email,
      });
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const signIn = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getCurrentUserData = async () => {
  if (currentUser) {
    try {
      const data = await getDoc(doc(db, 'users', currentUser.uid));
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  } else {
    return null;
  }
};

const logout = () => {
  signOut(auth);
};

const isLoggedIn = () => {
  console.log(currentUser);
  if (currentUser) {
    return true;
  } else {
    return false;
  }
};

const addItemToList = async (item) => {
  try {
    await updateDoc(doc(db, 'users', currentUser.uid), {
      todolist: arrayUnion(item),
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteItemFromList = async (item) => {
  try {
    await updateDoc(doc(db, 'users', currentUser.uid), {
      todolist: arrayRemove(item),
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export {
  auth,
  signIn,
  register,
  getCurrentUserData,
  logout,
  addItemToList,
  deleteItemFromList,
  isLoggedIn,
};
/*const database = {
  initialize(db) {
    this.db = db;
  },

  get instance() {
    return this.db;
  },

  collection(collectionName) {
    return this.db.collection(collectionName);
  },

  getAllFromCollection(collectionName) {
    return this.collection(collectionName).get();
  },

  async getAllFromSubcollection(parentCollection, subcollection) {
    const parents = await this.getAllFromCollection(parentCollection);
    const ids = parents.docs.map((doc) => doc.id);

    const results = [];

    for (let i = 0; i < ids.length; i++) {
      const resultPromise = await this.getAllFromCollection(
        `${parentCollection}/${ids[i]}/${subcollection}`
      );
      results.push(...resultPromise.docs.map((doc) => doc.data()));
    }

    return results;
  },

  async getPosts() {
    const createPost = (userUid, username, postId, post) => ({
      userUid,
      username,
      post: {
        id: postId,
        ...post,
      },
    });

    const posts = [];

    await this.db
      .collectionGroup('posts')
      .orderBy('created_at', 'desc')
      .get()
      .then(function (querySnapshot) {
        posts.push(
          ...querySnapshot.docs.map((doc) =>
            createPost(
              doc.data().userUid,
              doc.data().username,
              doc.id,
              doc.data()
            )
          )
        );
      });
    return posts;
  },

  async getPostsOfFollowedUsers(userUid) {
    const createPost = (userUid, username, postId, post) => ({
      userUid,
      username,
      post: {
        id: postId,
        ...post,
      },
    });

    const posts = [];

    const users = this.collection('users');

    const followedUsersIdsQueryResult = await users
      .doc(userUid)
      .collection('followedUsersIds')
      .get();

    const followedUsersIds = [userUid];
    followedUsersIds.push(
      ...followedUsersIdsQueryResult.docs.map((doc) => doc.id)
    );

    await this.db
      .collectionGroup('posts')
      .where('userUid', 'in', followedUsersIds)
      .orderBy('created_at', 'desc')
      .get()
      .then(function (querySnapshot) {
        posts.push(
          ...querySnapshot.docs.map((doc) =>
            createPost(
              doc.data().userUid,
              doc.data().username,
              doc.id,
              doc.data()
            )
          )
        );
      });

    return posts;
  },

  async getLikes(postId, userId) {
    const createLikes = (likeId, userId, postId) => ({
      likeId,
      userId,
      postId,
    });

    const likes = [];

    await this.db
      .collection('likes')
      .where('postId', '==', postId)
      .get()
      .then(function (querySnapshot) {
        likes.push(
          ...querySnapshot.docs.map((doc) =>
            createLikes(doc.id, doc.data().userId, doc.data().postId)
          )
        );
      });
    return likes;
  },

  async getComments(postId) {
    const createComments = (
      commentId,
      userId,
      name,
      surname,
      postId,
      content,
      created_at
    ) => ({
      commentId,
      userId,
      name,
      surname,
      postId,
      content,
      created_at,
    });

    const comments = [];

    await this.db
      .collection('comments')
      .where('postId', '==', postId)
      .get()
      .then(function (querySnapshot) {
        comments.push(
          ...querySnapshot.docs.map((doc) =>
            createComments(
              doc.id,
              doc.data().userId,
              doc.data().name,
              doc.data().surname,
              doc.data().postId,
              doc.data().content,
              doc.data().created_at
            )
          )
        );
      });
    return comments;
  },

  async setUser(user) {
    const users = this.collection('users');
    const uid = user.uid;
    delete user.uid;
    users.doc(uid).set(user);
  },

  async getUser(uid) {
    const users = this.collection('users');

    return users.doc(uid).get();
  },

  async updateUser(uid, userData) {
    const users = this.collection('users');
    await users.doc(uid).update(userData);
  },

  async setPost(userUid, username, post) {
    const posts = this.collection('users').doc(userUid).collection('posts');

    await posts.add({
      ...post,
      userUid,
      username,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },

  async getIsFollowedByCurrentUser(currentUserUid, userUid) {
    const users = this.collection('users');
    const followedUsers = users
      .doc(currentUserUid)
      .collection('followedUsersIds');

    return await followedUsers
      .doc(userUid)
      .get()
      .then((docSnapshot) => docSnapshot.exists);
  },

  async followUser(currentUserUid, userUid) {
    if (currentUserUid === userUid) return;
    const users = this.collection('users');
    const followedUsers = users
      .doc(currentUserUid)
      .collection('followedUsersIds');
    await followedUsers.doc(userUid).set({});
  },

  async unfollowUser(currentUserUid, userUid) {
    const users = this.collection('users');
    const followedUsers = users
      .doc(currentUserUid)
      .collection('followedUsersIds');
    await followedUsers.doc(userUid).delete();
  },

  async setLike(userId, postId) {
    const likes = this.collection('likes');

    await likes.add({
      postId,
      userId,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },

  async getLikeId(userId, postId) {
    const likeId = await this.db
      .collection('likes')
      .where('postId', '==', postId)
      .where('userId', '==', userId);

    return likeId.doc.id;
  },

  async deleteLike(userId, postId) {
    const likeId = await this.db
      .collection('likes')
      .where('postId', '==', postId)
      .where('userId', '==', userId)
      .get();
    if (!(typeof likeId.docs === 'undefined')) {
      await this.db.collection('likes').doc(likeId.docs[0].id).delete();
    }
  },

  async setComment(postId, userId, name, surname, content) {
    const comments = this.collection('comments');

    await comments.add({
      postId,
      userId,
      name,
      surname,
      content,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },
};

export default database;*/
