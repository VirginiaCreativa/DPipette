import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SignIn from './SignIn';
import SignOut from './SignOut';

const Signed = ({ isEmpty, className, onSettign }) => (
  <div className={className}>
    {isEmpty ? <SignOut /> : <SignIn onSettign={onSettign} />}
  </div>
);

export default compose(
  connect(({ firebase: { auth: { isEmpty } } }) => ({ isEmpty }))
)(Signed);
