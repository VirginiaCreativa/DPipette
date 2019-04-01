import React, { useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './NoteCornellPortada.module.scss';

const NoteCornellPortada = ({ firebase: { storage }, ID, notescornell }) => {
  const [isOnImage, setOnImage] = useState(true);
  const childRef = useRef(null);
  const handleOnFileChange = ev => {
    const fileUpload = ev.target.files[0];
    const id = ID;
    const materiaFB = notescornell[id].materia.toLowerCase();
    const materia = CleanUpSpecialChars(materiaFB);
    console.log(materia);
    // const metadata = {
    //   contentType: 'image/jpeg',
    // };
    // const storageRef = storage().ref(
    //   `notescornell/${notescornell[id].materia}/${
    //     notescornell[id].tema
    //   }/portada/${fileUpload.name}`
    // );
    // setOnImage(!isOnImage);
  };
  return (
    <div className={classes.NoteCornellPortada}>
      {isOnImage ? (
        <div className={classes.BoxFile}>
          <input
            type="file"
            name="imagendestacada"
            className={classes.InputFile}
            onChange={handleOnFileChange}
            ref={childRef}
            accept="image/*"
          />
          <button type="button" className="btn btn-primary btn-block">
            Añadir imagen destacada
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
