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
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  console.log(currentUser);
});

const register = async (username, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setDoc(doc(db, 'users', res.user.uid), {
        username: username,
        email: email,
        todolist: [],
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
      return data._document.data.value.mapValue.fields;
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
  console.log(auth.currentUser);
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
  app,
  auth,
  signIn,
  register,
  getCurrentUserData,
  logout,
  addItemToList,
  deleteItemFromList,
  isLoggedIn,
};
