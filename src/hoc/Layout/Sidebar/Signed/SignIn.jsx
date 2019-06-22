import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './SignIn.module.scss';
import photoProfile from '../../../../scripts/photoProfilePosition';

const SignIn = ({ firebase, profile, onSettign, colorSetting }) => (
  <div className={classes.SignIn}>
    <div className={classes.ProfileImg}>
      <img src={photoProfile(firebase, profile)} alt="El imagen de perfil" />
    </div>
    <button type="button" onClick={onSettign}>
      <i
        className="bx bx-dots-horizontal-rounded"
        style={{ color: `${colorSetting}` }}></i>
    </button>
  </div>
);
export default compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    colorSetting: state.Layout.colorSetting,
  }))
)(SignIn);
