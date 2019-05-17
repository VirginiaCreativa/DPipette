import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoConfig.module.scss';

import { getChangePageGrid } from '../../../../redux/actions/DocumentosAction';

const DocumentoConfig = ({
  documentos,
  favorito,
  pageGrid,
  getChangePageGrid,
  firestore,
  ID,
}) => {
  const [isFavorito, setFavorito] = useState(favorito);
  const [isActivePopever, setActivePopever] = useState(false);

  const onFavorite = () => {};
  const onDelete = () => {};
  const handleOpenPoprever = () => {};

  const onChangePageGrid = () => {
    firestore
      .update(`documentos/${ID}`, {
        pageGrid: !pageGrid,
      })
      .then(() => {})
      .catch(error => console.log(error));
    getChangePageGrid(!pageGrid);
  };

  const cssActivePopever = isActivePopever && classes.activeBtnPopever;

  return (
    <div className={classes.DocumentoConfig}>
      <button type="button" onClick={onChangePageGrid}>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getChangePageGrid }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      pageGrid: state.Documentos.pageGrid,
      documentos: state.firestore.data.documentos,
    }),
    mapDispatchToProps
  )
)(DocumentoConfig);
