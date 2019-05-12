import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Controls from './Controls';
import classes from './Video.module.scss';

import {
  getTimelineVideoDoc,
  getDurationVideoDoc,
} from '../../../redux/actions/DocumentosAction';

class VideoDoc extends Component {
  constructor(props) {
    super(props);
    this.refVideo = React.createRef();
    this.refProgress = React.createRef();
  }

  state = {
    isPlayer: 0,
    isDuration: 0,
    isCurrentTime: 0,
    isControlPlay: true,
  };

  componentDidMount() {
    const { isDuration, isCurrentTime } = this.state;
    // console.log('----->', isDuration, isCurrentTime);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isDuration, isCurrentTime } = this.state;
    // console.log('......>', isDuration, isCurrentTime);
    const progress = this.refProgress.current;
    progress.addEventListener('click', ev => {
      const scrubTime = parseFloat(
        (ev.offsetX / progress.offsetWidth) * isDuration
      );
      console.log(scrubTime);
      this.refVideo.currentTime = scrubTime;
    });
    this.props.getDurationVideoDoc(this.state.isDuration);
  }

  onPlay = () => {
    this.refVideo.play();
    const { isControlPlay } = this.state;
    this.setState({
      isControlPlay: !isControlPlay,
      isDuration: this.refVideo.duration,
      isCurrentTime: this.refVideo.currentTime,
    });
  };

  onPause = () => {
    const { isControlPlay } = this.state;
    this.refVideo.pause();
    this.setState({ isControlPlay: !isControlPlay });
  };

  onMarker = () => {
    this.props.getTimelineVideoDoc(this.refVideo.currentTime);
  };

  handleTimeUpdate = () => {
    this.setState({
      isCurrentTime: this.refVideo.currentTime,
    });
  };

  render() {
    const { title, srcVideo } = this.props;
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
          title={title}
          className="img-fluid"
          src={srcVideo}
          muted
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getDurationVideoDoc, getTimelineVideoDoc }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(VideoDoc);
