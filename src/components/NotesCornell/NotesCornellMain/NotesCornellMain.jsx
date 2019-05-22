import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Masonry from 'react-masonry-css';
import 'moment/locale/es';
import moment from 'moment';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './NotesCornellMain.module.scss';

import Item from './NotesCornellItem';
import { breakpointColumnsObj } from './breakpointColumnsObj';

const NotesCornellMain = ({
  notescornell,
  getFilterMateriaNC,
  Search,
  getFilterDateNowNC,
  getFilterDateYesterdayNC,
  getFilterFavoriteNC,
}) => {
  const dateItemNow = item =>
    moment(item)
      .locale('es')
      .format('LL');

  const dateItemYesterday = item =>
    moment(item)
      .locale('es')
      .format('LL');

  return (
    <div className={classes.NotesCornellMain}>
      {!isLoaded(notescornell) ? (
        <Spinner />
      ) : isEmpty(notescornell) ? (
        <Empty />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {notescornell &&
            notescornell
              .filter(item => {
                const dateToday = dateItemNow(item.date);
                const dateYesterday = dateItemYesterday(item.date);
                return (
                  item.tema.toLowerCase().includes(Search.toLowerCase()) &&
                  item.materia.includes(getFilterMateriaNC) &&
                  dateToday.includes(getFilterDateNowNC) &&
                  dateYesterday.includes(getFilterDateYesterdayNC) &&
                  item.favorite !== getFilterFavoriteNC
                );
              })
              .map(item => (
                <div key={item.id}>
                  <Item {...item} linked={`notecornell/${item.id}`} />
                </div>
              ))}
        </Masonry>
      )}
    </div>
  );
};

export default compose(
  firestoreConnect(['notescornell']),
  connect(state => ({
    notescornell: state.firestore.ordered.notescornell,
    Search: state.NotesCornell.search,
    getFilterMateriaNC: state.NotesCornell.materia,
    getFilterDateNowNC: state.NotesCornell.date,
    getFilterDateYesterdayNC: state.NotesCornell.yesterday,
    getFilterFavoriteNC: state.NotesCornell.favorite,
  }))
)(NotesCornellMain);
