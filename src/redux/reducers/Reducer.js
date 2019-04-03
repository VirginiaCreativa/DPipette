import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { connectRouter } from 'connected-react-router';
import createSignificado from './createSignificadoReducer';
import SearchSignificados from './SearchSignificados';
import NotesCornell from './NotesCornellReducer';
import Auth from './AuthReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    createSing: createSignificado,
    searchSign: SearchSignificados,
    Auth,
    NotesCornell,
  });
