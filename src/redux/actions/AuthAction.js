import { LOGIN_SUCESS, LOGIN_ERROR } from './Types';

export const SignIn = credentials => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .singInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({ type: LOGIN_SUCESS });
    })
    .catch(error => {
      dispatch({ type: LOGIN_ERROR });
    });
};
