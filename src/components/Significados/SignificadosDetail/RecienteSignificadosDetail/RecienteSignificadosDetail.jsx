import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { history } from '../../../../redux/store/Store';
import Search from '../../../UI/Search/Search';
import RecientItemSignificado from './RecientItemSignificado/RecientItemSignificado';

import Spinner from './Spinner/Spinner';
import classes from './RecientesSignificadosDetail.module.scss';

const RecienteSignificadosDetail = ({ significados, search, firestore }) => {
  const [isErrorSearch, setErrorSearch] = useState(false);

  const handleSearch = () => {
    const confirm = significados.map(item => item.word);
    console.log(confirm);
    // if (confirm) {
    //   confirm
    //     .get()
    //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         history.push(`/significado/${doc.id}`);
    //       });
    //     })
    //     .catch(error => {
    //       console.log('Error getting documents: ', error);
    //       setErrorSearch(true);
    //     });
    // } else {
    //   console.log('NO EXISTE');
    // }
  };
  return (
    <div className={classes.RecienteSignificadosDetail}>
      <h5 className={classes.Heading}>Reciente Significados</h5>
      <Search />
      {isErrorSearch ? <p>No existe una palabra o ortografía</p> : null}
      <button type="button" className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
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
            .slice(0, 4)
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
};

export default compose(
  firestoreConnect([
    {
      collection: 'significados',
      orderBy: ['date', 'desc'],
    },
  ]),
  connect(state => ({
    significados: state.firestore.ordered.significados,
    search: state.searchSign.search,
  }))
)(RecienteSignificadosDetail);
