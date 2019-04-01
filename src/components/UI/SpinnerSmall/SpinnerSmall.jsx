import React from 'react';
import classes from './SpinnerSmall.module.scss';

const SpinnerSmall = () => (
  <>
    <div className={classes.SpinnerSmall}>
      <div className={classes.Bounce1} />
      <div className={classes.Bounce2} />
      <div className={classes.Bounce3} />
    </div>
  </>
);

export default SpinnerSmall;
