import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { history } from '../../../redux/store/Store';
import Spinner from './Spinner/Spinner';
import classes from './SignificadoDetail.module.scss';
import HeadingDetail from './HeadingDetail/HeadingDetail';
import DescriptionDetail from './DescriptionDetail/DescriptionDetail';
import PalabrasDetail from './PalabrasDetail/PalabrasDetail';
import ImagenesDetail from './ImagenesDetail/ImagenesDetail';
import MasEjemplosDetail from './MasEjemplosDetail/MasEjemplosDetail';
import VideosDetail from './VideosDetail/VideosDetail';
import BuscadorSignficado from '../BuscadorSignficado/BuscadorSignficado';
import firebase from '../../../config/FirebaseConfig';

class SignificadoDetail extends Component {
  handleDetele = () => {
    const id = this.props.match.params.id;
    const firestore = this.props.firestore;
    firestore
      .collection('significados')
      .doc(id)
      .delete()
      .then(() => {
        history.push('/significados');
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  render() {
    const { significado } = this.props;
    return (
      <>
        {!isLoaded(significado) ? (
          <Spinner />
        ) : isEmpty(significado) ? (
          <Spinner />
        ) : (
          <div className={classes.SignificadoDetail}>
            <HeadingDetail {...significado} onDeleted={this.handleDetele} />
            <div className="row">
              <div className="col-6">
                <VideosDetail {...significado} />
                <div className={classes.spaceingBottom} />
                <ImagenesDetail {...significado} />
              </div>
              <div className="col-6">
                <DescriptionDetail {...significado} />
                <PalabrasDetail {...significado} />
                <div className={classes.spaceingBottom} />
                <MasEjemplosDetail {...significado} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default compose(
  connect((state, ownProps) => {
    const id = ownProps.match.params.id;
    const significados = state.firestore.data.significados;
    const significado = significados ? significados[id] : null;
    return {
      significado,
      auth: state.firebase.auth,
    };
  }),
  firestoreConnect(props => {
    const user = props.auth;
    if (!user.uid) return [];
    return [
      {
        collection: 'significados',
        where: [['uid', '==', user.uid]],
      },
    ];
  })
)(SignificadoDetail);
