import { takeLatest, all, call, put } from "redux-saga/effects";
import {
    createUserAuthWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* onCheckUserSession() {
    yield takeLatest(
        USER_ACTION_TYPES.CHECK_USER_SESSION,
        isUserAunthenticated
    );
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* isUserAunthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createUserAuthWithEmailAndPassword,
            email,
            password
        );
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
    yield call(getSnapShotFromUserAuth, user, additionalInfo);
}

export function* getSnapShotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalInfo
        );
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOut),
    ]);
}
