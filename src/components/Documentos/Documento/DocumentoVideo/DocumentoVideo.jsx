import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoVideo.module.scss';

import Controls from './Controls';

import {
  isHideTakerMarkerDoc,
  getTimelineVideoDoc,
  getDurationVideoDoc,
  isShowTakerMarkerDoc,
} from '../../../../redux/actions/DocumentosAction';
import msToTime from '../../../../scripts/msToTime';

class DocumentVideo extends Component {
  constructor(props) {
    super(props);
    this.refVideo = React.createRef();
    this.refProgress = React.createRef();
  }

  state = {
    isPlayer: 0,
    isCurrentTime: 0,
    isControlPlay: true,
  };

  componentDidMount() {
    this.refVideo.addEventListener('loadeddata', ev => {
      this.props.getDurationVideoDoc(ev.target.duration);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { isDuration, isCurrentTime } = this.state;
    const progress = this.refProgress.current;
    progress.addEventListener('click', ev => {
      const scrubTime = parseFloat(
        (ev.offsetX / progress.offsetWidth) * isDuration
      );
      this.refVideo.currentTime = scrubTime;
    });
  }

  onPlay = () => {
    this.refVideo.play();
    const { isControlPlay } = this.state;
    this.setState({
      isControlPlay: !isControlPlay,
    });
  };

  onPause = () => {
    const { isControlPlay } = this.state;
    this.refVideo.pause();
    this.setState({ isControlPlay: !isControlPlay });
  };

  onMarker = () => {
    this.props.getTimelineVideoDoc(this.refVideo.currentTime);
    this.props.isShowTakerMarkerDoc();
  };

  handleTimeUpdate = ev => {
    this.setState({
      isCurrentTime: this.refVideo.currentTime,
    });
  };

  handleTimelineMarke = (index, item) => {
    console.log(item.time);
    this.refVideo.currentTime = item.time;
    this.refVideo.play();
  };

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
    const { isCurrentTime, isDuration, isControlPlay } = this.state;
    return (
      <div className={classes.DocumentVideo}>
        <div className={classes.boxVideo}>
          <div className={classes.Video}>
            <Controls
              isCurrentTime={isCurrentTime}
              isDuration={isDuration}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onMarker={this.onMarker}
              controlPlay={isControlPlay}
              clickProgress={this.handleScrub}
              refProgress={this.refProgress}
              onTimeline={this.handleTimelineMarke}
            />
            <video
              ref={ref => (this.refVideo = ref)}
              onTimeUpdate={this.handleTimeUpdate}
              onLoadedMetadata={event =>
                this.setState({ isDuration: event.target.duration })
              }
              title={title}
              className="img-fluid"
              src={srcVideo}
              muted
              preload="true"
            />
          </div>
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
)(DocumentVideo);
