import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './NoteCornellYoutube.module.scss';

const VideoIframe = React.lazy(() => import('./VideoIframe'));

const NoteCornellYoutube = ({ docID, notescornell }) => {
  const [isVideoShow, setVideoShow] = useState(false);
  const [isVideoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (isVideoURL === null) {
      setVideoShow(false);
    } else {
      setVideoShow(true);
    }
  }, [isVideoURL]);

  const handleChangeVideoURL = ev => {
    console.log(ev.target.value);
  };
  return (
    <div>
      {isVideoShow ? (
        <React.Suspense fallback={<Spinner />}>
          <VideoIframe src={isVideoURL} />
        </React.Suspense>
      ) : (
        <div className={classes.GetVideo}>
          <input type="text" name="" id="" onChange={handleChangeVideoURL} />
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
