import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './DocumentosHome.module.scss';

import Item from './DocumentosItem';

const DocumentosHome = ({ documentos }) => (
  <div className={classes.DocumentosHome}>
    {!isLoaded(documentos) ? (
      <Spinner />
    ) : isEmpty(documentos) ? (
      <Empty />
    ) : (
      <div className={classes.GridMultiple}>
        {documentos &&
          documentos.map(item => (
            <div key={item.id}>
              <Item {...item} linked={`documento/${item.id}`} />
            </div>
          ))}
      </div>
    )}
  </div>
);

export default compose(
  connect(state => ({
    documentos: state.firestore.ordered.documentos,
    auth: state.firebase.auth,
  })),
  firestoreConnect(props => {
    const user = props.auth;
    if (!user.uid) return [];
    return [
      {
        collection: 'documentos',
        where: [['uid', '==', user.uid]],
        orderBy: ['date', 'desc'],
        limit: 4,
      },
    ];
  })
)(DocumentosHome);
