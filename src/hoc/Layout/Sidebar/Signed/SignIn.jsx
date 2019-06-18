import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classes from './SignIn.module.scss';

const SignIn = ({ onSettign, colorSetting }) => (
  <div className={classes.SignIn}>
    <h2>In</h2>
    <button type="button" onClick={onSettign}>
      <i
        className="bx bx-dots-horizontal-rounded"
        style={{ color: `${colorSetting}` }}></i>
    </button>
  </div>
);

export default compose(
  connect(
    state => ({
      colorSetting: state.Layout.colorSetting,
    }),
    null
  )
)(SignIn);
