import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Controls from './Controls';
import classes from './Video.module.scss';

import { getTimelineVideoDoc } from '../../../redux/actions/DocumentosAction';

const VideoDoc = ({ title, srcVideo, getTimelineVideoDoc }) => {
  let refVideo = useRef(null);
  const [isPlayer, setIsPlayer] = useState(true);
  const [isDuration, setIsDuration] = useState(0);
  const [isCurrentTimeNumber, setIsCurrentTimeNumber] = useState(0);

  useEffect(() => {
    setIsDuration(refVideo.duration);
    console.log('====>', refVideo.duration, refVideo.currentTime);
  }, []);

  const onPlay = () => {
    refVideo.play();
    setIsPlayer(false);
  };

  const onPause = () => {
    refVideo.pause();
  };

  const onMarker = () => {
    refVideo.pause();
    getTimelineVideoDoc(refVideo.currentTime);
  };

  const handleTimeUpdate = () => {
    setIsCurrentTimeNumber(refVideo.currentTime);
  };
  return (
    <div className={classes.Video}>
      <Controls
        Played={isPlayer}
        isCurrentTime={isCurrentTimeNumber}
        isDuration={isDuration}
        onPlay={onPlay}
        onPause={onPause}
        onMarker={onMarker}
      />
      <video
        src={srcVideo}
        tabIndex="0"
        ref={ref => (refVideo = ref)}
        onMouseOver={onPlay}
        title={title}
        className="img-fluid"
        muted
      />
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTimelineVideoDoc }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(VideoDoc);
