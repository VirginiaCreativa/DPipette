import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import firebase from '../../../../config/FirebaseConfig';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './NoteCornellPortada.module.scss';

const NoteCornellPortada = ({
  firebase: { storage },
  ID,
  notescornell,
  firestore,
}) => {
  const [isOnImage, setOnImage] = useState(true);
  const [isUploadValue, setUploadValue] = useState(0);
  const [isPortada, setPortada] = useState('');
  const childRef = useRef(null);

  useEffect(() => {
    if (notescornell[ID].portada === '') {
      setOnImage(true);
    } else {
      setOnImage(false);
    }
  }, [ID, notescornell]);
  const handleOnFileChange = ev => {
    const imgFile = ev.target.files[0];
    const id = ID;
    const materiaFB = notescornell[id].materia.toLowerCase();
    const temaFB = notescornell[id].tema.toLowerCase();
    const materia = CleanUpSpecialChars(materiaFB);
    const tema = CleanUpSpecialChars(temaFB);
    const temaNotSpace = tema.replace(/ +/g, '_');
    console.log(tema, materia);
    const metadata = {
      contentType: 'image/jpg',
    };
    const storageRef = storage().ref(
      `notescornell/${materia}/${temaNotSpace}/portada/${imgFile.name}`
    );
    const uploadTask = storageRef.put(imgFile, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const isDuration = parseFloat(progress).toFixed(0);
        console.log(`Upload is ${isDuration}% done`);
        setUploadValue(isDuration);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          default:
            console.log('Upload Not');
        }
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            console.log(error);
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('imageFile available at', downloadURL);
          setPortada(downloadURL);
          firestore.update(`notescornell/${ID}`, {
            portada: downloadURL,
            cover: 'option1',
          });
        });
      }
    );
    setOnImage(!isOnImage);
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
      ) : (
        <div className={classes.BoxPortada}>
          <img
            src={notescornell[ID].portada}
            alt={notescornell[ID].tema}
            className="img-fluid"
          />
        </div>
      )}
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
