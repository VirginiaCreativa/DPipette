/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firestoreConnect,
  withFirestore,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import { history } from '../../../redux/store/Store';
import Spinner from './Spinner/Spinner';
import classes from './NoteCornell.module.scss';

import NoteCornellHeader from './NoteCornellHeader/NoteCornellHeader';
import NoteCornellIdeas from './NoteCornellIdeas/NoteCornellIdeas';
import NoteCornellApuntes from './NoteCornellApuntes/NoteCornellApuntes';
import NoteCornellResumen from './NoteCornellResumen/NoteCornellResumen';
import NoteCornellYoutube from './NoteCornellYoutube/NoteCornellYoutube';
import BuscadorSignficado from '../../Significados/BuscadorSignficado/BuscadorSignficado';

class NoteCornell extends Component {
  state = {
    isFavorite: false,
  };

  handleDeleteId = () => {
    const id = this.props.match.params.id;
    const db = this.props.firestore;
    db.collection('notescornell')
      .doc(id)
      .delete()
      .then(() => {
        history.push('/notescornell');
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  handleFavoriteId = () => {
    const { isFavorite } = this.state;
    const id = this.props.match.params.id;
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      favorite: !isFavorite,
    })
      .then(() => {
        console.log('Favorito');
      })
      .catch(error => console.log(error));
    this.setState({ isFavorite: !isFavorite });
  };

  render() {
    const { notecornell } = this.props;
    return (
      <div className={classes.NotaCornell}>
        {!isLoaded(notecornell) ? (
          <Spinner />
        ) : isEmpty(notecornell) ? (
          <Spinner />
        ) : (
          <div className="row">
            <div className="col-12">
              <NoteCornellHeader
                {...notecornell}
                onDelete={this.handleDeleteId}
                onFavorite={this.handleFavoriteId}
                docID={this.props.match.params.id}
              />
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-3">
                  <NoteCornellIdeas
                    {...notecornell}
                    docID={this.props.match.params.id}
                  />
                </div>
                <div className="col-9">
                  <NoteCornellApuntes
                    {...notecornell}
                    docID={this.props.match.params.id}
                  />
                </div>
                <div className="col-12">
                  <NoteCornellResumen
                    {...notecornell}
                    docID={this.props.match.params.id}
                  />
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className={classes.Sidebar}>
                <NoteCornellYoutube
                  {...notecornell}
                  docID={this.props.match.params.id}
                />
                <BuscadorSignficado />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  firestoreConnect(['notescornell']),
  connect((state, ownProps) => {
    const id = ownProps.match.params.id;
    const notescornell = state.firestore.data.notescornell;
    const notecornell = notescornell ? notescornell[id] : null;
    return {
      notecornell,
    };
  }),
  withFirestore
)(NoteCornell);
