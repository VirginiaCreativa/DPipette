import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../../../config/FirebaseConfig';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';
import classes from './DocumentoPortada.module.scss';

import Image from './DocumentoImage';

const DocumentoPortada = ({
  firebase: { storage },
  ID,
  documentos,
  firestore,
  portada,
}) => {
  const [isOnImage, setOnImage] = useState(true);
  const [isUploadValue, setUploadValue] = useState(0);
  const [isShowImage, setShowImage] = useState(false);
  const childRef = useRef(null);
  let refPortada = useRef(null);

  useEffect(() => {
    if (portada === '' || portada === undefined) {
      setOnImage(true);
      setShowImage(false);
    } else {
      setShowImage(true);
      setOnImage(false);
      setUploadValue(0);
    }
  }, [portada]);

  const fileName = documentos[ID].filenamePortadaImagen;
  const materiaFB = documentos[ID].materia.toLowerCase();
  const temaFB = documentos[ID].tema.toLowerCase();
  const materia = CleanUpSpecialChars(materiaFB);
  const tema = CleanUpSpecialChars(temaFB);
  const temaNotSpace = tema.replace(/ +/g, '_');

  const handleOnFileChange = ev => {
    const imgFile = ev.target.files[0];
    const metadata = {
      contentType: 'image/jpg',
    };
    const storageRef = storage().ref(
      `documentos/${materia}/${temaNotSpace}/portada/${imgFile.name}`
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
          firestore.update(`documentos/${ID}`, {
            portada: downloadURL,
            cover: 'option1',
            filenamePortadaImagen: imgFile.name,
          });
        });
      }
    );
    setOnImage(!isOnImage);
  };

  const handleRemoveFile = () => {
    const storageRef = storage().ref(
      `documentos/${materia}/${temaNotSpace}/portada/${fileName}`
    );
    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE');
        setOnImage(true);
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    firestore.update(`documentos/${ID}`, {
      portada: '',
      filenamePortadaImagen: '',
    });
  };

  const classProgressUpload = {
    width: `${isUploadValue}%`,
  };
  return (
    <div className={classes.DocumentoPortada}>
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
          <p>Tamaño de imagen: 650x320</p>
        </div>
      ) : (
        <div className={classes.BoxPortada}>
          <div className={classes.showUpload} style={classProgressUpload} />
          {isShowImage && (
            <Image
              src={portada}
              alt={tema}
              onClick={handleRemoveFile}
              onRef={ref => (refPortada = ref)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default compose(
  firestoreConnect(['documentos']),
  connect(state => ({
    documentos: state.firestore.data.documentos,
  }))
)(DocumentoPortada);
