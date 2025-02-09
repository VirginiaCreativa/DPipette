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
  search,
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
                  item.tema.toLowerCase().includes(search.toLowerCase()) &&
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
  connect(state => ({
    notescornell: state.firestore.ordered.notescornell,
    search: state.NotesCornell.search,
    getFilterMateriaNC: state.NotesCornell.materia,
    getFilterDateNowNC: state.NotesCornell.date,
    getFilterDateYesterdayNC: state.NotesCornell.yesterday,
    getFilterFavoriteNC: state.NotesCornell.favorite,
    auth: state.firebase.auth,
  })),
  firestoreConnect(props => {
    const user = props.auth;
    if (!user.uid) return [];
    return [
      {
        collection: 'notescornell',
        where: [['uid', '==', user.uid]],
      },
    ];
  })
)(NotesCornellMain);
