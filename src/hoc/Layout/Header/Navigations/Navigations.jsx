import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Navigations.module.scss';
import SignedIn from './Signed/SignedIn';
import SignedOut from './Signed/SignedOut';

class Navigations extends Component {
  state = {
    login: false,
    user: true,
  };

  render() {
    const { user, login } = this.state;
    return (
      <>
        <div className={classes.Navigations}>
          {login ? <SignedIn userSign={user} /> : <SignedOut />}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {};
};

export default compose(
  firebaseConnect(['notescornell']),
  connect(
    mapStateToProps,
    null
  )
)(Navigations);
