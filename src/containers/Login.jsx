/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import classes from './Login.module.scss';

import { SignIn } from '../redux/actions/AuthAction';

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
  };

  handleChange = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };

  handleSubmit = () => {
    this.props.SignIn(this.state);
  };

  render() {
    return (
      <div className={classes.Login}>
        <div className={classes.BoxForm}>
          <div className={classes.Header}>
            <h4>Inicia sesión en DPipette</h4>
          </div>
          <div className={classes.Form}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  aria-describedby="emailHelp"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={this.handleChange}
                  id="userPassword"
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Registrarse
              </button>
            </form>
          </div>
        </div>
        <div className={classes.Img}>
          <img src={require('../assets/images/LoginBg.png')} alt="" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ SignIn }, dispatch);

export default compose(
  firebaseConnect(['notescornell']),
  connect(
    null,
    mapDispatchToProps
  )
)(Login);
