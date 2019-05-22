import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { history } from '../../../../redux/store/Store';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './DocumentoConfig.module.scss';

import Portada from '../DocumentoPortada/DocumentoPortada';

import { getChangePageGrid } from '../../../../redux/actions/DocumentosAction';

const DocumentoConfig = ({
  firebase: { storage },
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

  const onChangePageGrid = () => {
    firestore
      .update(`documentos/${ID}`, {
        pageGrid: !pageGrid,
      })
      .then(() => {})
      .catch(error => console.log(error));
    getChangePageGrid(!pageGrid);
  };

  const handleOpenPopreverPortada = () => {
    setOpenPortada(!onOpenPortada);
    setActivePopever(!isActivePopever);
  };

  const onFavorite = () => {
    setFavorito(!isFavorito);
    firestore
      .update(`documentos/${ID}`, {
        favorito: !isFavorito,
      })
      .then(() => {})
      .catch(error => console.log(error));
  };

  const handleRemoveID = () => {
    const fileNamePortada = documentos[ID].filenamePortadaImagen;
    const fileNameVideo = documentos[ID].filenameVideoDoc;
    console.log(fileNamePortada, fileNameVideo);
    const materiaFB = documentos[ID].materia.toLowerCase();
    const temaFB = documentos[ID].tema.toLowerCase();
    const materia = CleanUpSpecialChars(materiaFB);
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');

    const storageRefPortada = storage().ref(
      `documentos/${materiaFB}/${temaNotSpace}/portada/${fileNamePortada}`
    );
    const storageRefVideo = storage().ref(
      `documentos/${materiaFB}/${temaNotSpace}/video/${fileNameVideo}`
    );

    storageRefPortada
      .delete()
      .then(() => {
        console.log('SI DELETE PORTADA');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });

    storageRefVideo
      .delete()
      .then(() => {
        console.log('SI DELETE VIDEO');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });

    firestore
      .collection('documentos')
      .doc(ID)
      .delete()
      .then(() => {
        history.push('/documentos');
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
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
