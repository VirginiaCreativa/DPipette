import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { history } from '../redux/store/Store';
import firebase from '../config/FirebaseConfig';
import {
  Significados,
  NotesCornell,
  Documentos,
} from '../scripts/Home_Loadable';

import Header from '../components/UI/HeaderHome/HeaderHome';

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

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

  handleSignificadoNew = ev => {
    ev.preventDefault();
    history.push(`/significadocreate`);
  };

  handleNoteCornellNew = ev => {
    ev.preventDefault();
    const project = {
      date: Date.now(),
      tema: 'Nueva tema',
      materia: 'Nueva materia',
      preguntas: [] || null,
      importantes: [] || null,
      claves: [] || null,
      apuntes: [] || null,
      videoResumen: null,
      cover: 'option2',
      portada: '',
      favorite: false,
      getContent: JSON.stringify(content),
      getResumen: JSON.stringify(content),
      setContent: null,
      setResumen: null,
      videoNote: null,
      filenameVideoNote: '',
      filenamePortadaImagen: '',
    };
    this.props.firestore
      .add('notescornell', {
        ...project,
      })
      .then(doc => {
        history.push(`/notecornell/${doc.id}`);
      })
      .catch(error => console.log(error));
  };

  handleDocumentNew = ev => {
    ev.preventDefault();
    const project = {
      date: Date.now(),
      tema: 'Nueva tema',
      materia: 'Nueva materia',
      addTimeline: [],
      favorito: false,
      hasVideo: false,
      cover: 'option2',
      portada: '',
      filenamePortadaImagen: '',
      filenameVideoDoc: '',
      filenamePagesDoc: [],
      imgsPages: [],
      pageGrid: true,
    };
    this.props.firestore
      .add('documentos', {
        ...project,
      })
      .then(doc => {
        history.push(`/documento/${doc.id}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col">
            <Header
              title="Significados"
              iconName="icon-funnel-outline"
              colored="#ff6b6b"
              onClick={this.handleSignificadoNew}
            />
            <Significados />
          </div>
          <div className="col">
            <Header
              title="Notas Cornell"
              iconName="icon-book-outline"
              colored="#1fd1a1"
              onClick={this.handleNoteCornellNew}
            />
            <NotesCornell />
          </div>
          <div className="col">
            <Header
              title="Documentos"
              iconName="icon-file-text-outline"
              colored="#5f27cd"
              onClick={this.handleDocumentNew}
            />
            <Documentos />
          </div>
        </div>
      </>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect()
)(Home);
