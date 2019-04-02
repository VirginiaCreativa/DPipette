import React, { Component } from 'react';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { history } from '../redux/store/Store';
import classes from './NotesCornell.module.scss';

import Header from '../components/UI/HeaderMain_NotesCornell/HeaderMain_NotesCornell';
import Filter from '../components/NotesCornell/NotesCornellMain/Filter/Filter';
import NotesCornellMain from '../components/NotesCornell/NotesCornellMain/NotesCornellMain';

class NotesCornell extends Component {
  handleNewIDNotaCornell = ev => {
    ev.preventDefault();
    const project = {
      tema: 'Nueva tema',
      materia: 'Nueva materia',
      preguntas: [] || null,
      importantes: [] || null,
      claves: [] || null,
      date: new Date(),
      apuntes: [] || null,
      videoResumen: '',
      cover: 'option2',
      portada: '',
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
          linked="/notacornell/:id"
          clicked={this.handleNewIDNotaCornell}
        />
        <div className={classes.BoxContent}>
          <div className={classes.Filter}>
            <Filter />
          </div>
          <div className={classes.Filter}>
            <NotesCornellMain />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect()
)(NotesCornell);
