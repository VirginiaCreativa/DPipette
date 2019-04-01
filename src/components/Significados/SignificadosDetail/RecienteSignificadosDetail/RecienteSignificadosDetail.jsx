import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Search from '../../../UI/Search/Search';
import RecientItemSignificado from './RecientItemSignificado/RecientItemSignificado';

import Spinner from './Spinner/Spinner';
import classes from './RecientesSignificadosDetail.module.scss';

const RecienteSignificadosDetail = ({ significados, search }) => (
  <div className={classes.RecienteSignificadosDetail}>
    <h5 className={classes.Heading}>Reciente Significados</h5>
    <Search />
    <div className={classes.BoxSign}>
      {!isLoaded(significados) ? (
        <Spinner />
      ) : isEmpty(significados) ? (
        <Spinner />
      ) : (
        significados
          .filter(item =>
            item.word.toLowerCase().includes(search.toLowerCase())
          )
          .map(item => (
            <RecientItemSignificado
              key={item.id}
              linked={`${item.id}/${item.word}`}
              {...item}
            />
          ))
      )}
    </div>
  </div>
);

export default compose(
  firestoreConnect([
    {
      collection: 'significados',
      orderBy: ['date', 'desc'],
      limit: 6,
    },
  ]),
  connect(state => ({
    significados: state.firestore.ordered.significados,
    search: state.searchSign.search,
  }))
)(RecienteSignificadosDetail);
