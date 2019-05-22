import React, { Component } from 'react';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { history } from '../redux/store/Store';
import classes from './Documentos.module.scss';

import DocumentosMain from '../components/Documentos/DocumentosMain/DocumentosMain';
import Header from '../components/UI/HeaderMain_Documentos/HeaderMain_Documentos';

class Documentos extends Component {
  handleNewIDDocumento = ev => {
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
      <div className={classes.Documentos}>
        <Header
          title="Documentos"
          iconName="icon-file-text-outline"
          colored="#5f27cd"
          linked="/documento/:id"
          clicked={this.handleNewIDDocumento}
        />
        <DocumentosMain />
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect()
)(Documentos);
