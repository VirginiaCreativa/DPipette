import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import classes from './SignedOut.module.scss';

class SignedOut extends Component {
  render() {
    return (
      <>
        <div className={classes.SignedOut}>
          <button type="button">
            <Router>
              <Link to="/login">
                <i className="bx bx-log-out" />
                Sign Up
              </Link>
            </Router>
          </button>
        </div>
      </>
    );
  }
}

export default SignedOut;
