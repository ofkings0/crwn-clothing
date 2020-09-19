import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCdgDtuPHj3zMvGrefegC6STRFLAL8kgq4",
    authDomain: "crwndb-5a446.firebaseapp.com",
    databaseURL: "https://crwndb-5a446.firebaseio.com",
    projectId: "crwndb-5a446",
    storageBucket: "crwndb-5a446.appspot.com",
    messagingSenderId: "488645391681",
    appId: "1:488645391681:web:f051f48711295b42ee9dc0",
    measurementId: "G-ZSG9J55Q61"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
