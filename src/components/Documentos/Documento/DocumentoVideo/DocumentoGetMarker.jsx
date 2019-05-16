import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoGetMarker.module.scss';

import Controls from './Controls';

import {
  isHideTakerMarkerDoc,
  getTimelineVideoDoc,
  getDurationVideoDoc,
  isShowTakerMarkerDoc,
} from '../../../../redux/actions/DocumentosAction';
import msToTime from '../../../../scripts/msToTime';

class DocumentoGetMarker extends Component {
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
    const {
      title,
      srcVideo,
      getDurationVideoDoc,
      viewTakeTimeline,
      timelineVideo,
    } = this.props;
    return (
      <>
        <div className={classes.DocumentoGetMarker}>
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
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDurationVideoDoc,
      getTimelineVideoDoc,
      isShowTakerMarkerDoc,
      isHideTakerMarkerDoc,
    },
    dispatch
  );

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      timelineVideo: state.Documentos.timeline,
      durationVideo: state.Documentos.duration,
      viewTakeTimeline: state.Documentos.viewTakeTimeline,
      pageHeight: state.Documentos.pageHeight,
      documentos: state.firestore.data.documentos,
      timelineSame: state.Documentos.timelineSame,
    }),
    mapDispatchToProps
  )
)(DocumentoGetMarker);
