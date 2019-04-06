import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import 'moment/locale/es';
import classes from './Filtering.module.scss';

import {
  FilterMateria,
  FilterAll,
  FilteringCateg,
  FilterDate,
} from '../../../../redux/actions/NotesCornellAction';

const Filter = ({
  notescornell,
  FilterMateria,
  FilterAll,
  FilteringCateg,
  FilterDate,
}) => {
  let refBtnMateria;
  const dateNow = moment(Date.now())
    .locale('es')
    .format('LL');

  const handleFilteAll = () => {
    FilterAll();
  };
  const handleFilteToday = () => {
    FilterDate(dateNow);
  };
  const handleFilteFavourite = () => {
    console.log('Favorito');
  };
  const handleTagFilter = item => {
    FilterMateria(item);
  };
  const materia = notescornell && notescornell.map(item => item.materia);
  const tags = [...new Set(materia)].sort();

  return (
    <div className={classes.Filtering}>
      <div className={classes.Menu}>
        <button
          type="button"
          onClick={handleFilteAll}
          name="materia"
          className={classes.Active}>
          <i className="bx bx-grid-alt" />
          Todas
        </button>
        <button type="button" onClick={handleFilteToday} name="date">
          <i className="bx bx-calendar-event" />
          Hoy
        </button>
        <button type="button" onClick={handleFilteFavourite} name="like">
          <i className="bx bx-star" />
          Favoritos
        </button>
      </div>
      <div className={classes.Materias}>
        <h6>Etiquetas</h6>
        <ul>
          {tags.map(item => (
            <li key={item}>
              <button
                type="button"
                name="materia"
                ref={ref => (refBtnMateria = ref)}
                onClick={() => handleTagFilter(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { FilterMateria, FilterAll, FilteringCateg, FilterDate },
    dispatch
  );

export default compose(
  firestoreConnect(['notescornell']),
  connect(
    state => ({
      notescornell: state.firestore.ordered.notescornell,
    }),
    mapDispatchToProps
  )
)(Filter);
