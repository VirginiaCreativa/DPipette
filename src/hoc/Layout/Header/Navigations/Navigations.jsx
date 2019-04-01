import React, { Component } from 'react';
import classes from './Navigations.module.scss';
import SignedIn from './Signed/SignedIn';
import SignedOut from './Signed/SignedOut';

class Navigations extends Component {
  state = {
    login: true,
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

export default Navigations;
