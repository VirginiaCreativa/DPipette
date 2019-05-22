import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { height } from 'window-size';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';

const DocumentosHome = ({ documentos }) => (
  <div>
    {!isLoaded(documentos) ? (
      <Spinner />
    ) : isEmpty(documentos) ? (
      <Empty />
    ) : (
      <ul>
        {documentos &&
          documentos.map(item => (
            <li key={item.id}>
              <Link to={`documento/${item.id}`}>{item.tema}</Link>
              <img
                src={item.portada}
                alt={item.materia}
                className="img-fluid"
              />
            </li>
          ))}
      </ul>
    )}
  </div>
);

export default compose(
  firestoreConnect(['documentos']),
  connect(state => ({
    documentos: state.firestore.ordered.documentos,
  }))
)(DocumentosHome);
