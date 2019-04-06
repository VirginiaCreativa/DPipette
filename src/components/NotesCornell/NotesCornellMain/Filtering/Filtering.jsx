import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import 'moment/locale/es';
import classes from './Filtering.module.scss';

import {
  FilterMateria,
  FilterAll,
  FilterDate,
} from '../../../../redux/actions/NotesCornellAction';

const Filter = ({ notescornell, FilterMateria, FilterAll, FilterDate }) => {
  const [isActiveCategAll, setActiveCategAll] = useState(1);
  const [isActiveCategToday, setActiveCategToday] = useState(null);
  const [isActiveCategFavor, setActiveCategFavor] = useState(null);
  const [isActiveTag, setActiveTag] = useState(null);

  const dateNow = moment(Date.now())
    .locale('es')
    .format('LL');

  const handleFilteAll = ev => {
    FilterAll();
    setActiveCategAll(1);
    setActiveCategToday(null);
    setActiveCategFavor(null);
    setActiveTag(null);
  };
  const handleFilteToday = ev => {
    FilterDate(dateNow);
    setActiveCategAll(null);
    setActiveCategToday(2);
    setActiveCategFavor(null);
    setActiveTag(null);
  };
  const handleFilteFavourite = ev => {
    setActiveCategAll(null);
    setActiveCategToday(null);
    setActiveCategFavor(3);
    setActiveTag(null);
  };
  const handleTagFilter = (item, index) => {
    FilterMateria(item);
    setActiveCategAll(null);
    setActiveCategFavor(null);
    setActiveTag(null);
    setActiveTag(index);
  };
  const materia = notescornell && notescornell.map(item => item.materia);
  const tags = [...new Set(materia)].sort();

  const classActiveAll = isActiveCategAll === 1 ? classes.Active : null;
  const classActiveToday = isActiveCategToday === 2 ? classes.Active : null;
  const classActiveFavor = isActiveCategFavor === 3 ? classes.Active : null;

  return (
    <div className={classes.Filtering}>
      <div className={classes.Menu}>
        <button
          type="button"
          onClick={handleFilteAll}
          name="1"
          className={classActiveAll}>
          <i className="bx bx-grid-alt" />
          Todas
        </button>
        <button
          type="button"
          onClick={handleFilteToday}
          name="2"
          className={classActiveToday}>
          <i className="bx bx-calendar-event" />
          Hoy
        </button>
        <button
          type="button"
          onClick={handleFilteFavourite}
          name="3"
          className={classActiveFavor}>
          <i className="bx bx-star" />
          Favoritos
        </button>
      </div>
      <div className={classes.Materias}>
        <h6>Etiquetas</h6>
        <ul>
          {tags.map((item, index) => {
            const classActive = isActiveTag === index ? classes.Active : null;
            return (
              <li key={item}>
                <button
                  type="button"
                  name="materia"
                  className={classActive}
                  onClick={() => handleTagFilter(item, index)}>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ FilterMateria, FilterAll, FilterDate }, dispatch);

export default compose(
  firestoreConnect(['notescornell']),
  connect(
    state => ({
      notescornell: state.firestore.ordered.notescornell,
    }),
    mapDispatchToProps
  )
)(Filter);
