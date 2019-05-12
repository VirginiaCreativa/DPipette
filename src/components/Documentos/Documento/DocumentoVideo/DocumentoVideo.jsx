import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import VideoPlayer from '../../../UI/VideoPlayerDoc/VideoPlayer';
import classes from './DocumentoVideo.module.scss';

import { getTimelineVideoDoc } from '../../../../redux/actions/DocumentosAction';

const DocumentVideo = ({
  ID,
  firestore,
  documentos,
  timelineVideo,
  durationVideo,
  pageHeight,
}) => {
  const handleAddTimeline = () => {
    const arrayTimelines = documentos[ID].addTimeline;

    const timeline = Math.floor((pageHeight / durationVideo) * timelineVideo);
    firestore.update(`documentos/${ID}`, {
      addTimeline: arrayTimelines.concat(timeline),
    });
  };
  return (
    <div className={classes.DocumentVideo}>
      <div className={classes.boxVideo}>
        <VideoPlayer srcVideo="https://firebasestorage.googleapis.com/v0/b/dpipette-ff5ee.appspot.com/o/notescornell%2Feconomia%2Fciencia_economica%2Fresumen?alt=media&token=14e72533-38ae-4715-94fd-327846c32410" />
      </div>
      <div className={classes.boxAddTimeVideo}>
        <i className="bx bxs-bookmark" />
        <div className={classes.timeVideo}>
          <p>
            <strong>{timelineVideo}</strong>
          </p>
        </div>
        <button type="button" className="btn" onClick={handleAddTimeline}>
          Guardar
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTimelineVideoDoc }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  withRouter,
  connect(
    state => ({
      timelineVideo: state.Documentos.timeline,
      durationVideo: state.Documentos.duration,
      pageHeight: state.Documentos.pageHeight,
      documentos: state.firestore.data.documentos,
    }),
    mapDispatchToProps
  )
)(DocumentVideo);
