import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Controls from './Controls';
import classes from './Video.module.scss';

import {
  getTimelineVideoDoc,
  getDurationVideoDoc,
} from '../../../redux/actions/DocumentosAction';

const VideoDoc = ({ title, srcVideo, getTimelineVideoDoc }) => {
  let refVideo = useRef(null);
  const [isPlayer, setIsPlayer] = useState(true);
  const [isDuration, setIsDuration] = useState(0);
  const [isCurrentTimeNumber, setIsCurrentTimeNumber] = useState(0);
  const [isControlPlay, setControlPlay] = useState(true);

  const onPlay = () => {
    refVideo.play();
    setIsPlayer(false);
    setControlPlay(!isControlPlay);
    getDurationVideoDoc(57.573);
    setIsDuration(refVideo.duration);
    setIsCurrentTimeNumber(refVideo.currentTime);
    console.log('====>', refVideo.duration, refVideo.currentTime);
  };

  useEffect(() => {
    getDurationVideoDoc(57.573);
  });

  const onPause = () => {
    refVideo.pause();
    setControlPlay(!isControlPlay);
  };

  const onMarker = () => {
    refVideo.pause();
    getTimelineVideoDoc(refVideo.currentTime);
  };

  const handleTimeUpdate = () => {
    setIsCurrentTimeNumber(refVideo.currentTime);
  };

  console.log(isDuration);
  return (
    <div className={classes.Video}>
      <Controls
        Played={isPlayer}
        isCurrentTime={isCurrentTimeNumber}
        isDuration={isDuration}
        onPlay={onPlay}
        onPause={onPause}
        onMarker={onMarker}
        controlPlay={isControlPlay}
      />
      <video
        src={srcVideo}
        tabIndex="0"
        ref={ref => (refVideo = ref)}
        title={title}
        className="img-fluid"
        muted
      />
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getDurationVideoDoc, getTimelineVideoDoc }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(VideoDoc);
