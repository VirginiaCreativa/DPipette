import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Masonry from 'react-masonry-css';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './NotesCornellMain.module.scss';

import Item from './NotesCornellItem';
import { breakpointColumnsObj } from './breakpointColumnsObj';

const NotesCornellMain = ({ notescornell, FilterMateria, Search }) => (
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
                item.materia.includes(FilterMateria)
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
    FilterMateria: state.NotesCornell.materia,
  }))
)(NotesCornellMain);
