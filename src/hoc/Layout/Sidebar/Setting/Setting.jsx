import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { history } from '../../../../redux/store/Store';
import classes from './Setting.module.scss';

import SubSetting from './SubSetting';

import { getOnSetting } from '../../../../redux/actions/LayoutAction';

const Setting = ({ firebase, profile, getOnSetting }) => {
  const handleLogOut = () => {
    firebase.logout();
  };
  const handleConfiguration = () => {
    history.push('/configuration');
    getOnSetting(false);
  };
  return (
    <div className={classes.Setting}>
      <header>
        <h6>Ajuste</h6>
        <h1>{profile.namefull}</h1>
        <p>{profile.email}</p>
      </header>
      <div className={classes.boxSubSetting}>
        <SubSetting
          onLogOut={handleLogOut}
          onConfig={handleConfiguration}
          onContact={handleLogOut}
        />
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
