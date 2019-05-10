import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import VideoPlayer from '../../../UI/VideoPlayer/VideoPlayer';
import classes from './DocumentoVideo.module.scss';

import { getTimelineVideoDoc } from '../../../../redux/actions/DocumentosAction';

const DocumentVideo = ({ timeline }) => (
  <div className={classes.DocumentVideo}>
    <div className={classes.boxVideo}>
      <VideoPlayer srcVideo="https://firebasestorage.googleapis.com/v0/b/dpipette-ff5ee.appspot.com/o/notescornell%2Feconomia%2Fciencia_economica%2Fresumen?alt=media&token=14e72533-38ae-4715-94fd-327846c32410" />
    </div>
    <div className={classes.boxAddTimeVideo}>
      <button type="button" className="btn btn-primary">
        <i className="bx bx-plus" />
      </button>
      <div className={classes.timeVideo}>
        <p>
          <strong>{timeline}</strong>
        </p>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTimelineVideoDoc }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    state => ({ timeline: state.Documentos.timeline }),
    mapDispatchToProps
  )
)(DocumentVideo);
