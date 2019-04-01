import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import classes from './NoteCornellPortada.module.scss';

const NoteCornellPortada = () => {
  const [isOnImage, setOnImage] = useState(true);
  const handleOnImage = () => {
    setOnImage(!isOnImage);
  };
  return (
    <div className={classes.NoteCornellPortada}>
      {isOnImage ? (
        <div className={classes.BoxButton}>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleOnImage}>
            Añadir imagen descatada
          </button>
          <p>Tamaño de imagen: 400x310</p>
        </div>
      ) : null}
    </div>
  );
};

export default compose(
  firestoreConnect(['notescornell']),
  withRouter,
  connect(state => ({
    notescornell: state.firestore.data.notescornell,
  }))
)(NoteCornellPortada);
