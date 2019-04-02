import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Masonry from 'react-masonry-css';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './NotesCornellMain.module.scss';

import Item from './NotesCornellItem';

const NotesCornellMain = ({ notescornell, Search, MateriaFilter }) => {
  const breakpointColumnsObj = {
    default: 4,
    1920: 3,
    1680: 3,
    1600: 3,
    1440: 3,
    1366: 2,
    1280: 2,
    1024: 2,
    800: 1,
    720: 1,
    600: 1,
    480: 1,
    360: 1,
    320: 1,
  };
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
              .filter(
                item =>
                  item.tema.toLowerCase().includes(Search.toLowerCase()) &&
                  item.materia.includes(MateriaFilter)
              )
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
  firestoreConnect([
    {
      collection: 'notescornell',
      orderBy: ['date', 'desc'],
      limit: 6,
    },
  ]),
  connect(state => ({
    notescornell: state.firestore.ordered.notescornell,
    Search: state.NotesCornell.search,
    MateriaFilter: state.NotesCornell.materia,
  }))
)(NotesCornellMain);
