import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoConfig.module.scss';

import Portada from '../DocumentoPortada/DocumentoPortada';

import { getChangePageGrid } from '../../../../redux/actions/DocumentosAction';

const DocumentoConfig = ({
  documentos,
  favorito,
  portada,
  tema,
  pageGrid,
  getChangePageGrid,
  firestore,
  ID,
}) => {
  const [isFavorito, setFavorito] = useState(false);
  const [isActivePopever, setActivePopever] = useState(false);
  const [onOpenPortada, setOpenPortada] = useState(false);

  const onFavorite = () => {
    setFavorito(!isFavorito);
    firestore
      .update(`documentos/${ID}`, {
        favorito: !isFavorito,
      })
      .then(() => {})
      .catch(error => console.log(error));
  };
  const handleRemoveID = () => {};
  const handleOpenPopreverPortada = () => {
    setOpenPortada(!onOpenPortada);
    setActivePopever(!isActivePopever);
  };

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
        onClick={handleOpenPopreverPortada}
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
      <button type="button" onClick={handleRemoveID}>
        <i className="bx bx-trash-alt" />
      </button>
      {onOpenPortada && (
        <div className={classes.OpenPopever}>
          <Portada ID={ID} tema={tema} portada={portada} />
        </div>
      )}
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
