import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Router } from 'react-router-dom';
import { history } from './redux/store/Store';
import firebase from './config/FirebaseConfig';
import Routes from './routes/Routes';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in', user.uid);
      } else {
        console.log('No user is signed');
        history.push('/login');
      }
    });
  }

  componentWillUpdate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in', user.uid);
      } else {
        console.log('No user is signed');
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <>
        <Router history={history}>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </>
    );
  }
}

export default compose(
  connect(
    state => ({
      auth: state.firebase.auth,
    }),
    null
  )
)(App);
