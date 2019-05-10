/* eslint-disable no-shadow */
import React from 'react';
import classes from './Controls.module.scss';

const Controls = ({
  errored,
  isCurrentTime,
  isDuration,
  onPlay,
  onPause,
  onMarker,
  controlPlay,
}) => {
  const handleProgress = (current, duration) => {
    const isCurrentTime = parseFloat(current).toFixed(2);
    const isDuration = parseFloat(duration).toFixed(2);

    const percent = (isCurrentTime / isDuration) * 100;
    return percent;
  };

  const progressClass = {
    width: `${handleProgress(isCurrentTime, isDuration)}%`,
  };

  return (
    <>
      <div className={classes.Controls}>
        <div className={classes.Progress}>
          <div className={classes.ProgressBar} style={progressClass} />
          <div className={classes.ProgressFilled} />
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
        {errored && <i className="bx bx-error" />}
      </div>
    </>
  );
};

export default Controls;
