import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/database';
import '@firebase/auth';

const configKey = {
  apiKey: 'AIzaSyDSUHubSBrZcCrGEJrAXLGruXPz3XG-tMk',
  authDomain: 'dpipette-ff5ee.firebaseapp.com',
  databaseURL: 'https://dpipette-ff5ee.firebaseio.com',
  projectId: 'dpipette-ff5ee',
  storageBucket: 'dpipette-ff5ee.appspot.com',
  messagingSenderId: '931653933154',
};

firebase.initializeApp(configKey);
firebase.storage();
firebase.firestore();

export default firebase;
