import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import 'moment/locale/es';
import classes from './Filtering.module.scss';

import {
  getFilterMateriaNC,
  getFilterAllNC,
  getFilterDateNowNC,
  getFilterDateYesterdayNC,
  getFilterFavoriteNC,
  SearchNotesCornell,
} from '../../../../redux/actions/NotesCornellAction';

const Filter = ({
  notescornell,
  getFilterMateriaNC,
  getFilterAllNC,
  getFilterDateNowNC,
  getFilterDateYesterdayNC,
  getFilterFavoriteNC,
}) => {
  const [isActiveCategAll, setActiveCategAll] = useState(1);
  const [isActiveCategToday, setActiveCategToday] = useState(null);
  const [isActiveCategYesterday, setActiveCategYesterday] = useState(null);
  const [isActiveCategFavor, setActiveCategFavor] = useState(null);
  const [isActiveTag, setActiveTag] = useState(null);

  useEffect(
    () => () => {
      getFilterFavoriteNC(null);
    },
    [getFilterFavoriteNC]
  );

  const dateNow = moment(Date.now())
    .locale('es')
    .format('LL');

  const dateYesterday = moment(Date.now())
    .add(-1, 'days')
    .locale('es')
    .format('LL');

  const handleFilteAll = ev => {
    getFilterAllNC();
    getFilterDateNowNC('');
    getFilterDateYesterdayNC('');
    getFilterFavoriteNC(null);
    setActiveCategAll(1);
    setActiveCategToday(null);
    setActiveCategYesterday(null);
    setActiveCategFavor(null);
    setActiveTag(null);
  };
  const handleFilteToday = ev => {
    getFilterDateNowNC(dateNow);
    getFilterDateYesterdayNC('');
    getFilterFavoriteNC(null);
    setActiveCategAll(null);
    setActiveCategToday(2);
    setActiveCategYesterday(null);
    setActiveCategFavor(null);
  };
  const handleFilteYesterday = ev => {
    getFilterDateYesterdayNC(dateYesterday);
    getFilterDateNowNC('');
    getFilterFavoriteNC(null);
    setActiveCategAll(null);
    setActiveCategToday(null);
    setActiveCategYesterday(3);
    setActiveCategFavor(null);
    setActiveTag(null);
  };
  const handleFilteFavorite = ev => {
    getFilterFavoriteNC(false);
    setActiveCategAll(null);
    setActiveCategToday(null);
    setActiveCategYesterday(null);
    setActiveCategFavor(4);
    setActiveTag(null);
  };
  const handleTagFilter = (item, index) => {
    getFilterMateriaNC(item);
    setActiveCategAll(null);
    setActiveCategFavor(null);
    setActiveTag(null);
    setActiveTag(index);
  };
  const materia = notescornell && notescornell.map(item => item.materia);
  const tags = [...new Set(materia)].sort();

  const classActiveAll = isActiveCategAll === 1 ? classes.Active : null;
  const classActiveToday = isActiveCategToday === 2 ? classes.Active : null;
  const classActivYesterday =
    isActiveCategYesterday === 3 ? classes.Active : null;
  const classActiveFavor = isActiveCategFavor === 4 ? classes.Active : null;

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
          onClick={handleFilteYesterday}
          name="3"
          className={classActivYesterday}>
          <i className="bx bx-history" />
          Ayer
        </button>
        <button
          type="button"
          onClick={handleFilteFavorite}
          name="4"
          className={classActiveFavor}>
          <i className="bx bx-bookmark" />
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
  bindActionCreators(
    {
      getFilterMateriaNC,
      getFilterAllNC,
      getFilterDateNowNC,
      getFilterDateYesterdayNC,
      getFilterFavoriteNC,
    },
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
