import React, { useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoVideo.module.scss';
import Controls from './DocumentoControls';

import { getVideoDoc } from '../../../../redux/actions/DocumentosAction';

const DocumentoVideo = ({
  onRefVideo,
  onTimeUpdate,
  onSrc,
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
  ID,
}) => {
  const onUploadVideo = () => {
    firestore
      .update(`documentos/${ID}`, {
        hasVideo: !hasVideo,
      })
      .then(() => {})
      .catch(error => console.log(error));
    getVideoDoc(!hasVideo);
  };
  const onRemoveVideo = () => {
    firestore
      .update(`documentos/${ID}`, {
        hasVideo: !hasVideo,
      })
      .then(() => {})
      .catch(error => console.log(error));
    getVideoDoc(!hasVideo);
  };
  return (
    <>
      {hasVideo ? (
        <>
          <div className={classes.VideoPlayer}>
            <button
              type="button"
              onClick={onRemoveVideo}
              className={classes.btnDelete}>
              <i className="bx bxs-x-circle" />
            </button>
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
              src={onSrc}
              onTimeUpdate={onTimeUpdate}
              onDurationChange={onDurationChange}
            />
          </div>
        </>
      ) : (
        <>
          <h1>UPLOAD VIDEO</h1>
          <button type="button" onClick={onUploadVideo}>
            Video
          </button>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVideoDoc }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
    }),
    mapDispatchToProps
  )
)(DocumentoVideo);
