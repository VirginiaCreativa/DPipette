import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoConfig.module.scss';

const DocumentoConfig = ({ documentos, favorito }) => {
  const [isFavorito, setFavorito] = useState(favorito);
  const [isActivePopever, setActivePopever] = useState(false);

  const onFavorite = () => {};
  const onDelete = () => {};
  const handleOpenPoprever = () => {};

  const cssActivePopever = isActivePopever && classes.activeBtnPopever;

  return (
    <div className={classes.DocumentoConfig}>
      <button type="button" onClick={onDelete}>
        <i className="bx bx-transfer" />
      </button>
      <button
        type="button"
        onClick={handleOpenPoprever}
        className={[classes.btnPoprever, cssActivePopever].join(' ')}>
        <i className="bx bx-image" />
      </button>
      <button type="button" onClick={onFavorite}>
        {isFavorito ? (
          <i className="bx bxs-bookmark" />
        ) : (
          <i className="bx bx-bookmark" />
        )}
      </button>
      <button type="button" onClick={onDelete}>
        <i className="bx bx-trash-alt" />
      </button>
    </div>
  );
};

export default compose(
  firestoreConnect(['documentos']),
  connect(state => ({
    documentos: state.firestore.data.documentos,
  }))
)(DocumentoConfig);
