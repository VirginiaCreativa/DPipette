import React, { Component } from 'react';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { history } from '../redux/store/Store';
import classes from './NotesCornell.module.scss';

import Header from '../components/UI/HeaderMain_NotesCornell/HeaderMain_NotesCornell';
import Filtering from '../components/NotesCornell/NotesCornellMain/Filtering/Filtering';
import NotesCornellMain from '../components/NotesCornell/NotesCornellMain/NotesCornellMain';

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

class NotesCornell extends Component {
  handleNewIDNoteCornell = ev => {
    ev.preventDefault();
    const project = {
      uid: this.props.auth.uid,
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

  render() {
    return (
      <div className={classes.NotesCornell}>
        <Header
          title="Notas Cornell"
          iconName="icon-book-outline"
          colored="#1fd1a1"
          onClick={this.handleNewIDNoteCornell}
        />
        <div className={classes.BoxContent}>
          <div className={classes.Filter}>
            <Filtering />
          </div>
          <div className={classes.Contents}>
            <NotesCornellMain />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    auth: state.firebase.auth,
  })),
  firestoreConnect()
)(NotesCornell);
