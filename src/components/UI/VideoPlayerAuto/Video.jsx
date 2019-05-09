import React, { useState, useEffect, useRef } from 'react';
import { Player } from 'video-react';
import classes from './VideoPlayer.module.scss';

const Video = ({ title, src }) => {
  let refPlayer = useRef(null);
  useEffect(() => {
    console.log('========>', refPlayer.duration);
  });
  return (
    <div className={classes.Video}>
      <Player
        playsInline
        title={title}
        src={src}
        muted
        ref={el => (refPlayer = el)}
      />
    </div>
  );
};

export default Video;
