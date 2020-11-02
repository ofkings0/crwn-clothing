import { takeLatest, call, put, all } from 'redux-saga/effects';

import { 
  auth, 
  googleProvider, 
  createUserProfileDocument, 
  getCurrentUser,
} from '../../firebase/firebase.utils';

import { 
  signInFailure ,
  signInSuccess, 
  signOutFailure, 
  signOutSuccess,
  signUpSuccess,
  signUpFailure
} from './user.actions';

import UserActionTypes from './user.types';

export function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    signInWithGoogle
  )
}

export function* signInWithGoogle() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

export function* onEmailSigninStart () {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    signInWithEmail
  )
}

export function* signInWithEmail({payload: { email, password }}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
  yield put(signInFailure(error.message))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION, 
    isUserAuthenticated)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

export function* onSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START,
    signOut)
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error.message))
  }
}

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({id: snapshot, ...snapshot.data()})
    )
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START,
    signUp)
}

export function* signUp({ payload: {displayName, email, password}}) {
  try {
    const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({user, additionalData: {displayName}}))
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,
    signInAfterSignIn)
}

export function* signInAfterSignIn({ payload: {user, additionalData} }) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSigninStart),
    call(onCheckUserSession),
    call(onSignOut), 
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}