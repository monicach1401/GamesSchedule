import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider,signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


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
//export const useUserState = useAuthState(firebase.auth()); si pongo esto según documentación da error
//Line 29:29:  React Hook "useAuthState" cannot be called at the top level.
//React Hooks must be called in a React function component or a custom React Hook function  react-hooks/rules-of-hooks