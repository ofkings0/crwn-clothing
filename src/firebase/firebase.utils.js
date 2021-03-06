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

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc =>{ //converts collection snapshot into array 
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id, 
      title, 
      items
    }
  })

  //console.log(transformedCollection)
  return transformedCollection.reduce((accumulator, collection) => { //converts array of collection into object map that is stored in reducer
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {}) //{} == initial accumulator 
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

// export const addCollectionAndDocs = (collectionKey, objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc();
//     console.log(newDocRef);
//     batch.set(newDocRef, obj)
//   })

//   return await batch.commit();
// }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ promt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
