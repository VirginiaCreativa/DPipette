/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import firebase from '../config/FirebaseConfig';
import { history } from '../redux/store/Store';
import classes from './Login.module.scss';

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    error: null,
  };

  handleChange = ev => {
    this.setState({ [ev.target.id]: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.firebase
      .login({
        email: this.state.userEmail,
        password: this.state.userPassword,
      })
      .then(() => history.push('/'))
      .catch(error => console.log(error));
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
                  autoComplete="none"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Entrar
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

export default compose(
  firebaseConnect(),
  connect()
)(Login);
