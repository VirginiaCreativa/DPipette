import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Navigations.module.scss';
import SignedIn from './Signed/SignedIn';
import SignedOut from './Signed/SignedOut';

const Navigations = ({ isEmpty }) => {
  const [isUser] = useState(true);
  return (
    <div className={classes.Navigations}>
      {isEmpty ? <SignedOut /> : <SignedIn userSign={isUser} />}
    </div>
  );
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth: { isEmpty } } }) => ({ isEmpty }))
)(Navigations);
