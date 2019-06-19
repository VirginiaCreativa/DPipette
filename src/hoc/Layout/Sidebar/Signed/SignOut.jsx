import React from 'react';
import classes from './SignOut.module.scss';

const imgUser = require('../../../../assets/icons/user_unknown.svg');

const SignOut = () => (
  <div className={classes.SignOut}>
    <div className={classes.ProfileImg}>
      <img src={imgUser} alt="El imagen de perfil" />
    </div>
  </div>
);

export default SignOut;
