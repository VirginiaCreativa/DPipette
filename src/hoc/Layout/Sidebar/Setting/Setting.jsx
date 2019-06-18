import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Setting.module.scss';

const Setting = ({ profile }) => {
  console.log(profile);
  return (
    <div className={classes.Setting}>
      <header>
        <h6>Ajuste</h6>
      </header>
      <h1>{profile.namefull}</h1>
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
