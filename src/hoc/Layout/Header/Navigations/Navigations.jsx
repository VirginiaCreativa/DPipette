import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Navigations.module.scss';
import SignedIn from './Signed/SignedIn';
import SignedOut from './Signed/SignedOut';

class Navigations extends Component {
  state = {
    user: true,
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <div className={classes.Navigations}>
          {this.props.auth.isEmpty ? (
            <SignedOut />
          ) : (
            <SignedIn userSign={user} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebase.auth,
  }))
)(Navigations);
