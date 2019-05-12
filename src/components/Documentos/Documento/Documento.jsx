import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';

const Documento = ({ documento }) => (
  <div>
    {!isLoaded(documento) ? (
      <Spinner />
    ) : isEmpty(documento) ? (
      <Empty />
    ) : (
      <div>
        <h1>{documento.tema}</h1>
      </div>
    )}
  </div>
);

export default compose(
  firestoreConnect(['documentos']),
  connect((state, ownProps) => {
    const id = ownProps.match.params.id;
    console.log(id);
    const documentos = state.firestore.data.documentos;
    const documento = documentos ? documentos[id] : null;
    return {
      documento,
      durationVideo: state.Documentos.duration,
      timelineVideo: state.Documentos.timeline,
    };
  })
)(Documento);
