import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { history } from '../../../../redux/store/Store';
import classes from './Setting.module.scss';

import SettingSub from './SettingSub';
import SettingStorage from './SettingStorage';
import SettingProfile from './SettingProfile';

import { getOnSetting } from '../../../../redux/actions/LayoutAction';

const Setting = ({ firebase, profile, getOnSetting }) => {
  const handleLogOut = () => {
    firebase.logout();
  };
  const handleConfiguration = () => {
    history.push('/configuration');
    getOnSetting(false);
  };
  const handleContact = () => {
    history.push('/contact');
    getOnSetting(false);
  };
  return (
    <div className={classes.Setting}>
      <h6 className={classes.titleSetting}>Ajuste</h6>
      <header>
        <div className={classes.ProfileImg}>
          <img src={profile.photo} alt="El imagen de perfil" />
        </div>
        <div className={classes.ProfileData}>
          <h1>{profile.namefull}</h1>
          <p>{profile.email}</p>
        </div>
      </header>
      <div className={classes.boxSubSetting}>
        <SettingSub
          onLogOut={handleLogOut}
          onConfig={handleConfiguration}
          onContact={handleContact}
        />
      </div>
      <div className={classes.boxStorage}>
        <SettingStorage porcentStorage="43" />
      </div>
      <div className={classes.boxProfile}>
        <SettingProfile />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOnSetting }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth, profile } }) => ({
      auth,
      profile,
    }),
    mapDispatchToProps
  )
)(Setting);
