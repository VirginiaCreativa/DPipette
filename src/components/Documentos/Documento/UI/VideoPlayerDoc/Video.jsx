import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Controls from './Controls';
import classes from './Video.module.scss';

import {
  getTimelineVideoDoc,
  getDurationVideoDoc,
  isShowTakerMarkerDoc,
} from '../../../../../redux/actions/DocumentosAction';

class VideoDoc extends Component {
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
    this.refVideo.currentTime = this.props.timelineSame;
  };

  onPause = () => {
    const { isControlPlay } = this.state;
    this.refVideo.pause();
    this.setState({ isControlPlay: !isControlPlay });
    this.refVideo.currentTime = this.props.timelineSame;
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

  render() {
    const { title, srcVideo, getDurationVideoDoc } = this.props;
    const { isCurrentTime, isDuration, isControlPlay } = this.state;

    return (
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
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getDurationVideoDoc, getTimelineVideoDoc, isShowTakerMarkerDoc },
    dispatch
  );

export default compose(
  firestoreConnect(),
  connect(
    state => ({ timelineSame: state.Documentos.timelineSame }),
    mapDispatchToProps
  )
)(VideoDoc);
