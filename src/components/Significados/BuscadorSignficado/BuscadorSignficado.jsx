import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Search from '../../UI/Search/Search';
import ItemSignificado from './ItemSignificado';

import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './BuscadorSignficado.module.scss';

const BuscadorSignficado = ({ significados, search }) => (
  <div className={classes.BuscadorSignficado}>
    <div className={classes.Heading}>
      <Search />
      <Link to="/significadocreate"> + Añadir nueva palabra</Link>
    </div>
    <div className={classes.BoxSign}>
      {!isLoaded(significados) ? (
        <Spinner />
      ) : isEmpty(significados) ? (
        <Empty />
      ) : (
        significados
          .filter(item =>
            item.word.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
          .slice(0, 4)
          .map(item => (
            <ItemSignificado key={item.id} linked={`${item.id}`} {...item} />
          ))
      )}
    </div>
  </div>
);

export default compose(
  connect(state => ({
    significados: state.firestore.ordered.significados,
    search: state.searchSign.search,
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
      },
    ];
  })
)(BuscadorSignficado);
