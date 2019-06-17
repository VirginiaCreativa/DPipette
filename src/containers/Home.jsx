import React, { Component } from 'react';
import { history } from '../redux/store/Store';
import firebase from '../config/FirebaseConfig';
import {
  Significados,
  NotesCornell,
  Documentos,
} from '../scripts/Home_Loadable';

import Header from '../components/UI/HeaderHome/HeaderHome';

class Home extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in', user.uid);
      } else {
        console.log('No user is signed');
        history.push('/login');
      }
    });
  }

  componentWillUpdate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in', user.uid);
      } else {
        console.log('No user is signed');
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col">
            <Header
              title="Significados"
              iconName="icon-funnel-outline"
              colored="#ff6b6b"
            />
            <Significados />
          </div>
          <div className="col">
            <Header
              title="Notas Cornell"
              iconName="icon-book-outline"
              colored="#1fd1a1"
            />
            <NotesCornell />
          </div>
          <div className="col">
            <Header
              title="Documentos"
              iconName="icon-file-text-outline"
              colored="#5f27cd"
            />
            <Documentos />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
