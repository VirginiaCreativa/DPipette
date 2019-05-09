import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import firebase from '../../../../config/FirebaseConfig';
import CleanUpSpecialChars from '../../../../scripts/CleanUpSpecialChars';

import classes from './NoteCornellVideo.module.scss';

import VideoPlayer from '../../../UI/VideoPlayerAuto/VideoPlayer';

const NoteCornellVideo = ({
  docID,
  notescornell,
  firestore,
  videoNote,
  firebase: { storage },
}) => {
  const [isVideoShow, setVideoShow] = useState(true);
  const [isUploadValue, setUploadValue] = useState(0);
  const childRef = useRef(null);
  let refVideoNote = useRef(null);

  const fileName = notescornell[docID].filenameVideoNote;
  const materiaFB = notescornell[docID].materia.toLowerCase();
  const temaFB = notescornell[docID].tema.toLowerCase();
  const materia = CleanUpSpecialChars(materiaFB);
  const tema = CleanUpSpecialChars(temaFB);
  const temaNotSpace = tema.replace(/ +/g, '_');

  useEffect(
    () => () => {
      if (videoNote === '' || videoNote === null) {
        setVideoShow(true);
      } else {
        setVideoShow(false);
        setUploadValue(0);
      }
      console.log(refVideoNote.currentTime);
    },
    [docID, notescornell, videoNote]
  );

  const handleOnFileChange = ev => {
    const videoFile = ev.target.files[0];
    const metadata = {
      contentType: 'video/mp4, video/webm;codecs=vp9',
    };

    const storageRef = storage().ref(
      `notescornell/${materia}/${temaNotSpace}/videoNote/${videoFile.name}`
    );
    const uploadTask = storageRef.put(videoFile, metadata);

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
          firestore.update(`notescornell/${docID}`, {
            videoNote: downloadURL,
            filenameVideoNote: videoFile.name,
          });
          console.log('=====> YA PROBAR');
          setVideoShow(false);
        });
      }
    );
  };

  useEffect(() => () => {
    if (videoNote) {
      setVideoShow(false);
      setUploadValue(0);
    }
  });

  const handleRemoveFile = () => {
    console.log('delete');
    const storageRef = storage().ref(
      `notescornell/${materia}/${temaNotSpace}/videoNote/${fileName}`
    );
    storageRef
      .delete()
      .then(() => {
        console.log('SI DELETE');
        setVideoShow(true);
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    firestore.update(`notescornell/${docID}`, {
      videoNote: '',
      filenameVideoNote: '',
    });
  };

  const classProgressUpload = {
    width: `${isUploadValue}%`,
  };

  return (
    <div className={classes.NoteCornellVideo}>
      {isVideoShow ? (
        <div className={classes.BoxFile}>
          <h6>Subir un video del intérprete o traducción</h6>
          <input
            type="file"
            name="imagendestacada"
            className={classes.InputFile}
            onChange={handleOnFileChange}
            ref={childRef}
            accept="video/mp4, video/webm"
          />
          <button type="button" className="btn btn-primary btn-block">
            Añadir un video
          </button>
          <p>Obligación un archivo de video => mp4 o webm</p>
          <div className={classes.showUpload} style={classProgressUpload} />
        </div>
      ) : (
        <div className={classes.videoNote}>
          <button
            type="button"
            onClick={handleRemoveFile}
            className={classes.btnDelete}>
            <i className="bx bxs-x-circle" />
          </button>
          <VideoPlayer
            src={videoNote}
            onClick={handleRemoveFile}
            onRef={ref => (refVideoNote = ref)}
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
)(NoteCornellVideo);
