import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './NoteCornellYoutube.module.scss';

const VideoIframe = React.lazy(() => import('./VideoIframe'));

const NoteCornellYoutube = ({ docID, notescornell, firestore }) => {
  const [isVideoShow, setVideoShow] = useState(false);
  const [isVideoURL, setVideoURL] = useState(null);
  const [isVideoYoutube, setVideoYoutube] = useState(null);

  useEffect(() => {
    const id = docID;
    const urlVideoYoutube = notescornell[id].videoURLYoutube;
    if (urlVideoYoutube === null) {
      setVideoShow(false);
    } else {
      setVideoShow(true);
    }
  }, [docID, notescornell]);

  const handleChangeVideoURL = ev => {
    console.log(ev.target.value);
    setVideoURL(ev.target.value);
  };

  const handleAddYoutube = () => {
    const id = docID;
    firestore.update(`notescornell/${id}`, {
      videoURLYoutube: isVideoURL,
    });
    setVideoShow(true);
  };
  return (
    <div className={classes.NoteCornellYoutube}>
      {isVideoShow ? (
        <React.Suspense fallback={<Spinner />}>
          <VideoIframe src={isVideoURL} />
        </React.Suspense>
      ) : (
        <div className={classes.GetVideo}>
          <h6>Video de un intérprete o traducción</h6>
          <div className={classes.Form}>
            <input
              type="text"
              onChange={handleChangeVideoURL}
              placeholder="Añadir URL de Youtube"
            />
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleAddYoutube}>
              <i className="bx bxl-youtube" />
            </button>
          </div>
          <p>Benefición: Graba Youtube en Movil</p>
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
)(NoteCornellYoutube);
