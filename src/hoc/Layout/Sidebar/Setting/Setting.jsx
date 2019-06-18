import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Setting.module.scss';

const Setting = ({ firebase, profile }) => {
  const handleLogOut = () => {};
  return (
    <div className={classes.Setting}>
      <header>
        <h6>Ajuste</h6>
        <h1>{profile.namefull}</h1>
      </header>
      <div className={classes.boxSubSetting}>
        <button type="button" onClick={handleLogOut}>
          <i className="bx bx-log-out-circle" style={{ color: '#9ca7b4' }}></i>
        </button>
      </div>
    </div>
  );
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  }))
)(Setting);
