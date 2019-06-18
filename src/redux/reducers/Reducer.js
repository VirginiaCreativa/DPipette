import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { connectRouter } from 'connected-react-router';
import SearchSignificados from './SearchSignificados';
import Significados from './SignificadosReducer';
import NotesCornell from './NotesCornellReducer';
import Documentos from './DocumentosReducer';
import Layout from './LayoutReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    searchSign: SearchSignificados,
    Significados,
    NotesCornell,
    Documentos,
    Layout,
  });
