import React, { useState } from 'react';
import VideoPlayer from '../../../UI/VideoPlayer/VideoPlayer';
import classes from './VideosDetail.module.scss';

const VideosDetail = ({ videoDescripcion, videoSena }) => {
  const [isVideo, setIsVideo] = useState(false);
  const handleCheckbox = () => {
    setIsVideo(!isVideo);
  };
  return (
    <div className={classes.VideosDetail}>
      <div className={classes.VideoItem}>
        {isVideo ? (
          <VideoPlayer srcVideo={videoDescripcion} />
        ) : (
          <VideoPlayer srcVideo={videoSena} />
        )}
      </div>
      <div className={classes.boxButtons}>
        <div
          className={[classes.Switcher, 'd-flex justify-content-end'].join(
            ' '
          )}>
          <input
            onChange={handleCheckbox}
            id="toggle-on"
            className={[classes.Toggle, classes.toggleLeft].join(' ')}
            name="prop1"
            value="isActiveSena"
            type="radio"
            defaultChecked
          />
          <label htmlFor="toggle-on" className={classes.LabelBtn}>
            Seña
          </label>
          <input
            onChange={handleCheckbox}
            id="toggle-off"
            className={[classes.Toggle, classes.toggleRight].join(' ')}
            name="prop1"
            value="isActiveDescrip"
            type="radio"
          />
          <label htmlFor="toggle-off" className={classes.LabelBtn}>
            Descripción
          </label>
        </div>
      </div>
    </div>
  );
};

export default VideosDetail;
