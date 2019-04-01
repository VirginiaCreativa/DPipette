/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Controls from './Controls';
import classes from './Video.module.scss';

const Video = ({ title, srcVideo }) => {
  let refVideo;
  const [isPlayer, setIsPlayer] = useState(true);
  const [isDuration, setIsDuration] = useState(0);
  const [isCurrentTimeNumber, setIsCurrentTimeNumber] = useState(0);

  useEffect(() => {
    setIsDuration(refVideo.duration);
  });

  const handleVideoOver = () => {
    refVideo.play();
    setIsPlayer(false);
  };
  const handleVideoOut = () => {
    refVideo.pause();
    refVideo.currentTime = 0;
    setIsPlayer(true);
  };
  const handleTimeUpdate = () => {
    setIsCurrentTimeNumber(refVideo.currentTime);
  };

  return (
    <div className={classes.Video}>
      <div className={classes.VideOverflow}>
        <Controls
          Played={isPlayer}
          isCurrentTime={isCurrentTimeNumber}
          isDuration={isDuration}
        />
        <video
          src={srcVideo}
          tabIndex="0"
          ref={ref => (refVideo = ref)}
          onMouseOver={handleVideoOver}
          onMouseOut={handleVideoOut}
          onTimeUpdate={handleTimeUpdate}
          title={title}
          className="img-fluid"
          // autoPlay
          muted
        />
      </div>
    </div>
  );
};

export default Video;
