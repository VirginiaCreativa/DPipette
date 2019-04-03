import React from 'react';
import { Player } from 'video-react';
import classes from './VideoPlayer.module.scss';

const Video = ({ title, src }) => (
  <div className={classes.Video}>
    <Player playsInline title={title} src={src} muted />
  </div>
);

export default Video;
