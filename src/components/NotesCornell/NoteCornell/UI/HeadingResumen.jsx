import React from 'react';
import classes from './Heading.module.scss';

const HeadingResumen = ({
  onClickEditable,
  onClickVideo,
  title,
  onActiveEditable,
  onActiveVideo,
}) => {
  const classActiveEditor = onActiveEditable
    ? classes.btnActiveEditor
    : classes.btnEditable;
  const classActiveVideo = onActiveVideo
    ? classes.btnActiveVideo
    : classes.btnVideo;
  return (
    <div className={classes.HeadingResumen}>
      <h5>{title}</h5>
      {/* <button
        type="button"
        onClick={onClickEditable}
        className={classActiveEditor}>
        <i className="bx bx-pencil" />
      </button>
      <button type="button" onClick={onClickVideo} className={classActiveVideo}>
        <i className="bx bx-video" />
      </button> */}
    </div>
  );
};

export default HeadingResumen;
