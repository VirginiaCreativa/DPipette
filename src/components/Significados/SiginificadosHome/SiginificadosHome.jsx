import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import SiginificadosItem from './SiginificadosItem';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';

const SiginficadosHome = ({ significados }) => (
  <>
    {!isLoaded(significados) ? (
      <Spinner />
    ) : isEmpty(significados) ? (
      <Empty />
    ) : (
      significados.map(item => (
        <SiginificadosItem
          key={item.id}
          linked={`significado/${item.id}/${item.word}`}
          {...item}
        />
      ))
    )}
  </>
);

export default compose(
  connect(state => ({
    significados: state.firestore.ordered.significados,
    auth: state.firebase.auth,
  })),
  firestoreConnect(props => {
    const user = props.auth;
    if (!user.uid) return [];
    return [
      {
        collection: 'significados',
        where: [['uid', '==', user.uid]],
        orderBy: ['date', 'desc'],
        limit: 3,
      },
    ];
  })
)(SiginficadosHome);
