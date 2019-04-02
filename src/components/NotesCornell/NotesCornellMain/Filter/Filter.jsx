import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import classes from './Filter.module.scss';

const Filter = ({ notescornell }) => {
  const handleFilteAdd = () => {
    console.log('Funciona');
  };
  const handleFiltePresent = () => {
    console.log('Funciona');
  };
  const handleFilteStar = () => {
    console.log('Funciona');
  };
  const handleFilteRecient = () => {
    console.log('Funciona');
  };
  const materia = notescornell && notescornell.map(item => item.materia);
  const tags = [...new Set(materia)];
  // const index = array && array.filter(item => item === 'Nueva materia');

  return (
    <div className={classes.Filter}>
      <div className={classes.Menu}>
        <button
          type="button"
          onClick={handleFilteAdd}
          className={classes.Active}>
          <i className="bx bx-grid-alt" />
          Todas
        </button>
        <button type="button" onClick={handleFiltePresent}>
          <i className="bx bx-calendar-event" />
          Presentación
        </button>
        <button type="button" onClick={handleFilteStar}>
          <i className="bx bx-star" />
          Favoritos
        </button>
        <button type="button" onClick={handleFilteRecient}>
          <i className="bx bx-time" />
          Recientes
        </button>
      </div>
      <div className={classes.Materias}>
        <h6>Etiquetas</h6>
        <ul>
          {tags.map(item => (
            <li key={item.id}>
              <button type="button">{item}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect([
    {
      collection: 'notescornell',
      orderBy: ['materia'],
    },
  ]),
  connect(state => ({
    notescornell: state.firestore.ordered.notescornell,
  }))
)(Filter);
