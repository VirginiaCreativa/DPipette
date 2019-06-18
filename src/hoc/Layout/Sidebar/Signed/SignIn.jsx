import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './SignIn.module.scss';

const imgUser = require('../../../../assets/icons/user_unknown.svg');

const SignIn = ({ firebase, profile, onSettign, colorSetting }) => {
  console.log(profile);
  const photoProfile = () => {
    const currentUser = firebase.auth().currentUser;
    let photoProfile;
    if (currentUser) {
      if (currentUser.providerData[0].providerId === 'google.com') {
        photoProfile = currentUser.photoURL;
      } else if (
        currentUser.providerData[0].providerId === 'password' &&
        profile.photo === ''
      ) {
        photoProfile = imgUser;
      } else {
        photoProfile = profile.photo;
      }
    } else {
      console.log('ERROR');
    }
    return photoProfile;
  };

  return (
    <div className={classes.SignIn}>
      <div className={classes.ProfileImg}>
        <img src={photoProfile()} alt="El imagen de perfil" />
      </div>
      <button type="button" onClick={onSettign}>
        <i
          className="bx bx-dots-horizontal-rounded"
          style={{ color: `${colorSetting}` }}></i>
      </button>
    </div>
  );
};

export default compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    colorSetting: state.Layout.colorSetting,
  }))
)(SignIn);
