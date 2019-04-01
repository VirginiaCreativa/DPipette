import React, { Component } from 'react';
import classes from './SignedIn.module.scss';
import ButtonCreates from './ButtonCreates/ButtonCreates';
import UserProfile from './UserProfile/UserProfile';

class SignedIn extends Component {
  handleSearch = ev => {
    console.log(ev.target.value);
  };

  render() {
    const { userSign } = this.props;
    return (
      <>
        <div className={classes.SignedIn}>
          <div className={classes.Grid}>
            <ButtonCreates />
          </div>
          <div className={classes.Grid}>
            <UserProfile userSign={userSign} />
          </div>
        </div>
      </>
    );
  }
}

export default SignedIn;
