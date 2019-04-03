import { LOGIN_SUCESS, LOGIN_ERROR } from '../actions/Types';

const InitialState = {
  authError: null,
};

const AuthReducer = (state = InitialState, action) => {
  switch (action.type) {
    case LOGIN_SUCESS:
      console.log('LOGIN SUCCESS');
      return {
        ...state,
        authError: null,
      };
    case LOGIN_ERROR:
      console.log('LOGIN ERROR');
      return {
        ...state,
        authError: 'Login Fallo',
      };
    default:
      return state;
  }
};

export default AuthReducer;
