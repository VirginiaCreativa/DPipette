import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoControls.module.scss';

import { msToTime } from '../../../../scripts/msToTime';

const Controls = ({
  isCurrentTime,
  onPlay,
  onPause,
  onMarker,
  onControlPlay,
  onRefProgress,
  documentos,
  durationVideo,
  onTimeline,
  addTimeline,
  onClickPlay,
}) => {
  const [isWidthProgress, setWidthProgress] = useState(0);
  const refProgressSlider = useRef(null);

  useEffect(() => () => {
    setWidthProgress(
      refProgressSlider.current.offsetWidth ||
        refProgressSlider.current.clientWidth
    );
  });

  const handleProgress = () => {
    const float = parseFloat(isCurrentTime / durationVideo).toFixed(2);
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

  return (
    <div className={classes.DocumentoControls}>
      <div className={classes.Control}>
        {onControlPlay ? (
          <button type="button" onClick={onPlay}>
            <i className="bx bx-play" />
          </button>
        ) : (
          <button type="button" onClick={onPause}>
            <i className="bx bx-pause" />
          </button>
        )}
      </div>
      <div className={classes.TimeVideo}>{msToTime(isCurrentTime)}</div>
      <div className={classes.progressSlider} ref={refProgressSlider}>
        {addTimeline.map((item, index) => (
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
          ref={onRefProgress}
          onClick={onClickPlay}
          role="button"
          tabIndex="0">
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
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
      timelineVideo: state.Documentos.timeline,
      durationVideo: state.Documentos.duration,
    }),
    null
  )
)(Controls);
