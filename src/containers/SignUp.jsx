import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { history } from '../redux/store/Store.js';
import classes from './SignUp.module.scss';

const SignUp = ({ firestore, firebase }) => {
  console.log(firestore);
  const handleSubmitPassword = ev => {
    ev.preventDefault();
    const { namefull, email, password } = ev.target.elements;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(result => {
        result.user.updateProfile({
          displayName: namefull.value,
        });

        const configuracion = {
          url: 'http://localhost:3000',
        };

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.log(error);
          alert(error.message, 4000);
        });

        firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            namefull: namefull.value,
            email: email.value,
            photo: '',
          })
          .then(() => {
            history.push('/');
          })
          .catch(error => console.log(error.message));
      })
      .catch(error => {
        console.log(error);
        alert(error.message, 4000);
      });
  };
  const handleAuthRegistrarGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        firebase
          .firestore()
          .collection('users')
          .doc(result.user.uid)
          .set({
            namefull: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          })
          .then(() => {
            history.push('/');
          })
          .catch(error => console.log(error.message));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  return (
    <div className={classes.SignUp}>
      <div className={classes.boxHeadign}>
        <h4>Registrate en DPipette</h4>
      </div>
      <div className={classes.boxForm}>
        <form onSubmit={handleSubmitPassword}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" name="namefull" className="form-control" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Registrate
          </button>
        </form>
        <button
          type="button"
          onClick={handleAuthRegistrarGoogle}
          className={[classes.btnGoogle, 'btn btn-block'].join(' ')}>
          <box-icon type="logo" name="google" />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(['users']),
  connect()
)(SignUp);
