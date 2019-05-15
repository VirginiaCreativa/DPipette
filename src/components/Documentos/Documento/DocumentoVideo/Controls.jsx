import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
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
  match,
  documentos,
  durationVideo,
  onTimeline,
}) => {
  const [isWidthProgress, setWidthProgress] = useState(0);
  const refProgressSlider = useRef(null);

  useEffect(() => () => {
    setWidthProgress(refProgressSlider.current.offsetWidth);
  });

  const handleProgress = () => {
    const float = parseFloat(isCurrentTime / isDuration).toFixed(2);
    const percent = float * 100;
    return percent;
  };

  const progressClass = {
    width: `${handleProgress()}%`,
  };

  const isTimeWidth = time => {
    const timeWidth = Math.floor((isWidthProgress / durationVideo) * time);
    return timeWidth;
  };

  const timelineDB = documentos[match.params.id].addTimeline;
  return (
    <div className={classes.Controls}>
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
      </div>
      <div className={classes.progressSlider} ref={refProgressSlider}>
        {timelineDB.map((item, index) => (
          <div
            key={index}
            className={classes.MarkerTimeline}
            onClick={() => onTimeline(index, item)}
            role="presentation">
            <span
              className={classes.lineM}
              style={{ left: `${isTimeWidth(item.time)}px` }}
            />
          </div>
        ))}

        <div
          className={classes.Progress}
          ref={refProgress}
          role="button"
          tabIndex="0"
          onClick={clickProgress}>
          <div className={classes.ProgressFilled} style={progressClass} />
        </div>
      </div>
      <div className={classes.Control}>
        <button type="button" onClick={onMarker} className={classes.btnMark}>
          <i className="bx bxs-bookmark" />
        </button>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(),
  withRouter,
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
      timelineVideo: state.Documentos.timeline,
      durationVideo: state.Documentos.duration,
    }),
    null
  )
)(Controls);
