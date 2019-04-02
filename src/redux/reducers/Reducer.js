import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { connectRouter } from 'connected-react-router';
import createSignificado from './createSignificadoReducer';
import SearchSignificados from './SearchSignificados';
import SearchNotesCornell from './SearchNotesCornell_Reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    createSing: createSignificado,
    searchSign: SearchSignificados,
    searchNotesCornell: SearchNotesCornell,
  });
