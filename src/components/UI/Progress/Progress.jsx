import React from 'react';
import classes from './Progress.module.scss';

const Progress = ({ value }) => (
  <div className={classes.Progress}>
    <progress value={value} max="100" />
  </div>
);

export default Progress;
