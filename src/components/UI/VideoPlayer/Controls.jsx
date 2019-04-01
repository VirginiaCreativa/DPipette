/* eslint-disable no-shadow */
import React from 'react';
import classes from './Controls.module.scss';

const Controls = ({ Played, errored, isCurrentTime, isDuration }) => {
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
        {Played ? (
          <div className={classes.Player}>
            <i className="bx bx-play" />
          </div>
        ) : (
          <div className={classes.Progress}>
            <div className={classes.ProgressBar} style={progressClass} />
            <div className={classes.ProgressFilled} />
          </div>
        )}
        {errored && <i className="bx bx-error" />}
      </div>
    </>
  );
};

export default Controls;
