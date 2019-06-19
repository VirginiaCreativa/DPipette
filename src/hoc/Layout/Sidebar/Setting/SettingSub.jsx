import React from 'react';
import classes from './Setting.module.scss';

const SubSetting = ({ onLogOut, onConfig, onContact }) => (
  <div className={classes.boxSubSetting}>
    <button type="button" className={classes.btnLogOut} onClick={onLogOut}>
      <i className="bx bx-log-out-circle"></i>
    </button>
    <button
      type="button"
      className={classes.btnConfiguration}
      onClick={onConfig}>
      <i className="bx bx-cog"></i>
    </button>
    <button type="button" className={classes.btnContact} onClick={onContact}>
      <i className="bx bx-envelope"></i>
    </button>
  </div>
);

export default SubSetting;
