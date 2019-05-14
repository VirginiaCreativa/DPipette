import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import VideoPlayer from '../UI/VideoPlayerDoc/VideoPlayer';
import classes from './DocumentoVideo.module.scss';

import { isHideTakerMarkerDoc } from '../../../../redux/actions/DocumentosAction';
import msToTime from '../../../../scripts/msToTime';

class DocumentVideo extends Component {
  handleAddTimeline = () => {
    const {
      documentos,
      ID,
      durationVideo,
      pageHeight,
      timelineVideo,
      firestore,
    } = this.props;

    this.props.isHideTakerMarkerDoc();
    const arrayTimelines = documentos[ID].addTimeline;
    const PageHeight = Math.floor((pageHeight / durationVideo) * timelineVideo);
    firestore.update(`documentos/${ID}`, {
      addTimeline: arrayTimelines.concat({
        time: timelineVideo,
        height: PageHeight,
      }),
    });
  };

  handleCancelMarker = () => {
    this.props.isHideTakerMarkerDoc();
  };

  render() {
    const { viewTakeTimeline, timelineVideo } = this.props;
    return (
      <div className={classes.DocumentVideo}>
        <div className={classes.boxVideo}>
          <VideoPlayer srcVideo="https://firebasestorage.googleapis.com/v0/b/dpipette-ff5ee.appspot.com/o/notescornell%2Fprueba%20materia%201%2Fprueba_1%2Fresumen%2Fprueba_1?alt=media&token=37705e96-54d5-44a6-a6a6-8cd3555a5015" />
        </div>
        {viewTakeTimeline && (
          <div className={classes.boxAddTimeVideo}>
            <i className="bx bxs-bookmark" />
            <div className={classes.timeVideo}>
              <p>
                <strong>{msToTime(timelineVideo)}</strong>
              </p>
            </div>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: '#10c78d' }}
              onClick={this.handleAddTimeline}>
              Guardar
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: 'transparent', color: '#f33d48' }}
              onClick={this.handleCancelMarker}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ isHideTakerMarkerDoc }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      timelineVideo: state.Documentos.timeline,
      durationVideo: state.Documentos.duration,
      viewTakeTimeline: state.Documentos.viewTakeTimeline,
      pageHeight: state.Documentos.pageHeight,
      documentos: state.firestore.data.documentos,
    }),
    mapDispatchToProps
  )
)(DocumentVideo);
