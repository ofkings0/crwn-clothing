import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore , convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetichCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log("I am fired")
  
  //'call' is a saga effect that initiates function
  //'put' is saga effect - does the same as 'dispatch' for thunk 
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap)); 
  } catch (error) {
    yield put(fetichCollectionsFailure(error.message))
  }
 
  //Below is the code for writing redux thunk. Does the same as above. 
  // const collectionRef = firestore.collection('collections');
  // collectionRef.get().then(snapshot => { //promise
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   //console.log(collectionsMap);
  //   dispatch(fetchCollectionsSuccess(collectionsMap))
  // }).catch(error => dispatch(fetichCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}