import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../../../config/FirebaseConfig';
import classes from './DocumentoVideo.module.scss';
import Controls from './DocumentoControls';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';

const DocumentoVideo = ({
  onRefVideo,
  onTimeUpdate,
  videoDoc,
  onDurationChange,
  isCurrentTime,
  onPlay,
  onPause,
  onMarker,
  onControlPlay,
  onRefProgress,
  onTimeline,
  addTimeline,
  hasVideo,
  firestore,
  documentos,
  ID,
  showEditable,
  firebase: { storage },
  auth,
}) => {
  const [isProgressUploadValue, setProgressUploadValue] = useState(0);
  const [isActiveEditable, setActiveEditable] = useState(false);

  useEffect(
    () => () => {
      setTimeout(() => {
        setProgressUploadValue(0);
      }, 20000);
      setActiveEditable(!showEditable);
    },
    [showEditable, videoDoc]
  );

  const fileName = documentos[ID].filenameVideoDoc;
  const materiaFB = documentos[ID].materia.toLowerCase();
  const temaFB = documentos[ID].tema.toLowerCase();
  const materia = CleanUpSpecialChars(materiaFB);
  const tema = CleanUpSpecialChars(temaFB);
  const temaNotSpace = tema.replace(/ +/g, '_');

  const handleOnFileVideo = ev => {
    const videoFile = ev.target.files[0];
    const metadata = {
      contentType: 'video/webm;codecs=vp9',
    };

    const storageRef = storage().ref(
      `documentos/${auth.uid}/${materia}/${temaNotSpace}/video/${videoFile.name}`
    );

    const uploadTask = storageRef.put(videoFile, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const isDuration = parseFloat(progress).toFixed(0);
        console.log(`Upload is ${isDuration}% done`);
        setProgressUploadValue(isDuration);
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
            videoDoc: downloadURL,
            filenameVideoDoc: videoFile.name,
            hasVideo: !hasVideo,
          });
          console.log('=====> YA PROBAR');
        });
      }
    );
  };
  const handleRemoveVideo = () => {
    firestore
      .update(`documentos/${ID}`, {
        hasVideo: !hasVideo,
      })
      .then(() => {})
      .catch(error => console.log(error));

    console.log('delete');
    const storageRef = storage().ref(
      `documentos/${auth.uid}/${materia}/${temaNotSpace}/video/${fileName}`
    );
    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    firestore.update(`documentos/${ID}`, {
      videoDoc: '',
      filenameVideoDoc: '',
      hasVideo: !hasVideo,
    });
  };

  const classProgressUpload = {
    width: `${isProgressUploadValue}%`,
  };

  return (
    <>
      {hasVideo ? (
        <>
          <div className={classes.VideoPlayer}>
            {isActiveEditable && (
              <button
                type="button"
                onClick={handleRemoveVideo}
                className={classes.btnDelete}>
                <i className="bx bxs-x-circle" />
              </button>
            )}
            <Controls
              isCurrentTime={isCurrentTime}
              onPlay={onPlay}
              onPause={onPause}
              onMarker={onMarker}
              onControlPlay={onControlPlay}
              onRefProgress={onRefProgress}
              onTimeline={onTimeline}
              addTimeline={addTimeline}
            />
            <video
              className="img-fluid"
              ref={onRefVideo}
              muted
              preload="auto"
              src={videoDoc}
              onTimeUpdate={onTimeUpdate}
              onDurationChange={onDurationChange}
            />
          </div>
        </>
      ) : (
        <>
          <div className={classes.BoxFile}>
            <h6>Subir un video de la intérprete o traducción</h6>
            <input
              type="file"
              name="imagendestacada"
              className={classes.InputFile}
              onChange={handleOnFileVideo}
              accept="video/mp4, video/webm"
            />
            <button type="button" className="btn btn-primary btn-block">
              Añadir un video
            </button>
            <p>Obligación un archivo de video => mp4 or webm</p>
            <div className={classes.showUpload} style={classProgressUpload} />
          </div>
        </>
      )}
    </>
  );
};

export default compose(
  firestoreConnect(['documentos']),
  connect(state => ({
    documentos: state.firestore.data.documentos,
    showEditable: state.Documentos.Editable,
    auth: state.firebase.auth,
  }))
)(DocumentoVideo);
