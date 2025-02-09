import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoGetMarker.module.scss';

import {
  isHideTakerMarkerDoc,
  getTimelineVideoDoc,
  getDurationVideoDoc,
  isShowTakerMarkerDoc,
} from '../../../../redux/actions/DocumentosAction';
import { msToTime } from '../../../../scripts/msToTime';

class DocumentoGetMarker extends Component {
  handleAddTimeline = () => {
    const {
      documentos,
      ID,
      durationVideo,
      pageHeight,
      timelineVideo,
      firestore,
      markerHeight,
    } = this.props;

    this.props.isHideTakerMarkerDoc();
    const arrayTimelines = documentos[ID].addTimeline;
    firestore.update(`documentos/${ID}`, {
      addTimeline: arrayTimelines.concat({
        time: timelineVideo,
        height: markerHeight,
      }),
    });
  };

  handleCancelMarker = () => {
    this.props.isHideTakerMarkerDoc();
  };

  render() {
    const { viewTakeTimeline, timelineVideo } = this.props;
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
                style={{ backgroundColor: '#dfe4ea', color: '#48505a' }}
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
      markerHeight: state.Documentos.markerHeight,
    }),
    mapDispatchToProps
  )
)(DocumentoGetMarker);
