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
  firestoreConnect([
    {
      collection: 'significados',
      orderBy: ['date', 'desc'],
      limit: 3,
    },
  ]),
  connect(state => ({
    significados: state.firestore.ordered.significados,
  }))
)(SiginficadosHome);
