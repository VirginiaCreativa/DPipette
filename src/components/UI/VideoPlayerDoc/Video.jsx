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

  useEffect(() => {
    console.log('====>', refVideo.duration, refVideo.currentTime);
  });

  const onPlayControl = () => {
    refVideo.play();
    setIsPlayer(false);
    setControlPlay(!isControlPlay);
    getDurationVideoDoc(57.573);
    setIsDuration(refVideo.duration);
    setIsCurrentTimeNumber(refVideo.currentTime);
    console.log('====>', refVideo.duration, refVideo.currentTime);
  };

  const onPause = () => {
    refVideo.pause();
    setControlPlay(!isControlPlay);
  };

  const onMarker = () => {
    getTimelineVideoDoc(refVideo.currentTime);
  };

  const handleTimeUpdate = () => {
    setIsCurrentTimeNumber(refVideo.currentTime);
  };

  const handleRange = ev => {
    console.log('******>', ev.target.value);
    refVideo[ev.target.name] = ev.target.value;

    refVideo.play();
  };

  return (
    <div className={classes.Video}>
      <Controls
        isCurrentTime={isCurrentTimeNumber}
        isDuration={isDuration}
        onPlayControl={onPlayControl}
        onPause={onPause}
        onMarker={onMarker}
        controlPlay={isControlPlay}
        onRange={handleRange}
        nameRange="currentTime"
        maxTimeVideo={isDuration}
      />
      <video
        ref={ref => (refVideo = ref)}
        onTimeUpdate={handleTimeUpdate}
        title={title}
        className="img-fluid"
        src={srcVideo}
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
