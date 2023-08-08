import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, set } from 'firebase/database';
import 'firebase/database';
import { useObject } from 'react-firebase-hooks/database';
import { useList } from 'react-firebase-hooks/database';


const firebaseConfig = {
  apiKey: "AIzaSyCbVN17XC7ImMyMmz_tX_rLFwlDiKfcMaM",
  authDomain: "gamesschedule-6b172.firebaseapp.com",
  databaseURL: "https://gamesschedule-6b172-default-rtdb.firebaseio.com",
  projectId: "gamesschedule-6b172",
  storageBucket: "gamesschedule-6b172.appspot.com",
  messagingSenderId: "265000773032",
  appId: "1:265000773032:web:63e1c84a96c54bb64e299d",
  measurementId: "G-D79CHWT04C"
};

const firebase = initializeApp(firebaseConfig);

// Función que nos permite hacer SingIn
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

// Función que nos permite hacer SingOut
const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

export const useUserState = () => useAuthState(getAuth(firebase));


/* incializamos la variable de database */
const database = getDatabase(firebase);

/* useObject nos devuelve un array con 3 valores
snapshot, loading, error y en snapshot es donde guardaremos nuestros datos*/

export const DatabaseValue = (value) => {
  const [snapshot, loading, error] = useObject(ref(database, value));
  if (error) {
    console.error(error);
  }
  if (loading) {
    console.log('Loading data...');
  }
  if (snapshot) {
    const data = snapshot.val();
    return data;
  }
  return null;
};

export const DatabaseList = (value) => {
  const [snapshots, loading, error] = useList(ref(database, value));

  if (error) {
    console.error(error);
  }
  if (loading) {
    console.log('Loading data...');
  }

  if (snapshots) {
    return snapshots;
  }
}
