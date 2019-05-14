import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
  documentos,
}) => {
  const handleProgress = () => {
    const float = parseFloat(isCurrentTime / isDuration).toFixed(2);
    const percent = float * 100;
    return percent;
  };

  const progressClass = {
    width: `${handleProgress()}%`,
  };
  const handleTimelineMarke = ev => {
    console.log(ev);
  };

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
      <div className={classes.progressSlider}>
        <div
          className={classes.MarkerTimeline}
          onClick={handleTimelineMarke}
          role="presentation">
          <span className={classes.lineM} />
          {/* {documentos.map(item => (
            <span key={item} style={progressClass} />
          ))} */}
        </div>
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
  connect(
    state => ({ documentos: state.firestore.data.documentos }),
    null
  )
)(Controls);
