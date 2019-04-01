import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classes from './Videos.module.scss';

const Videos = ({ videoSenaBlob, videoDescripBlob }) => (
  <div className={classes.Videos}>
    <div className="row">
      <div className="col">
        <h6>Descripción:</h6>
        <video
          src={videoDescripBlob}
          autoPlay
          loop
          muted
          className="img-fluid"
        />
      </div>
      <div className="col">
        <h6>Seña:</h6>
        <video src={videoSenaBlob} autoPlay loop muted className="img-fluid" />
      </div>
    </div>
  </div>
);

export default compose(
  firestoreConnect(),
  connect(state => ({
    videoSenaBlob: state.createSing.videoSenaBlob,
    videoDescripBlob: state.createSing.videoDescripBlob,
  }))
)(Videos);
