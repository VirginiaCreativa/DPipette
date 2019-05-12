import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';

const DocumentosMain = ({ documentos }) => (
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
)(DocumentosMain);
