import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import classes from './Navigations.module.scss';
import SignedIn from './Signed/SignedIn';
import SignedOut from './Signed/SignedOut';

const Navigations = ({ firebase, isEmpty }) => {
  const [isUser] = useState(true);
  return (
    <div className={classes.Navigations}>
      {isEmpty ? <SignedOut /> : <SignedIn userSign={isUser} />}
    </div>
  );
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth: { isEmpty } } }) => ({ isEmpty }))
)(Navigations);
