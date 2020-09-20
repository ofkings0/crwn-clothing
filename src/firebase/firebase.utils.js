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

//aync function bc we are calling API
export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if (!userAuth) return; //is there is no user logged in, do not carry out function

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); //await used bc aysnc function

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef; //userRef returned in case we ever need to use it. 
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
