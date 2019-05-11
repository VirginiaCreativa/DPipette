/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import classes from './Controls.module.scss';

const Controls = ({
  isCurrentTime,
  isDuration,
  onPlay,
  onPause,
  onMarker,
  controlPlay,
  clickProgress,
  refProgress,
}) => {
  const handleProgress = (current, duration) => {
    const float = parseFloat(current / duration).toFixed(2);
    const percent = float * 100;
    return percent;
  };

  const progressClass = {
    width: `${handleProgress(isCurrentTime, isDuration)}%`,
  };

  return (
    <div className={classes.Controls}>
      <div
        className={classes.Progress}
        ref={refProgress}
        role="button"
        tabIndex="0"
        onClick={clickProgress}>
        <div className={classes.ProgressFilled} style={progressClass} />
      </div>

      <div className={classes.Control}>
        {controlPlay ? (
          <button type="button" onClick={onPlay}>
            <i className="bx bx-play" />
          </button>
        ) : (
          <button type="button" onClick={onPause}>
            <i className="bx bx-pause" />
          </button>
        )}

        <button type="button" onClick={onMarker}>
          <i className="bx bxs-bookmark" />
        </button>
      </div>
    </div>
  );
};

export default Controls;
