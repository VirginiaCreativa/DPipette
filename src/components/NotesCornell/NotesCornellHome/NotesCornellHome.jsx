import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './NotesCornellHome.module.scss';

import Item from './NotesCornellItem';

const NotesCornellHome = ({ notescornell }) => (
  <div className={classes.NotesCornellHome}>
    {!isLoaded(notescornell) ? (
      <Spinner />
    ) : isEmpty(notescornell) ? (
      <Empty />
    ) : (
      <div className={classes.GridMultiple}>
        {notescornell &&
          notescornell.map(item => (
            <div key={item.id}>
              <Item {...item} linked={`notecornell/${item.id}`} />
            </div>
          ))}
      </div>
    )}
  </div>
);

export default compose(
  firestoreConnect([
    {
      collection: 'notescornell',
      orderBy: ['date', 'desc'],
      limit: 4,
    },
  ]),
  connect(state => ({
    notescornell: state.firestore.ordered.notescornell,
  }))
)(NotesCornellHome);
