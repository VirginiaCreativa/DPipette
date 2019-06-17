import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { history } from '../redux/store/Store.js';
import firebase from '../config/FirebaseConfig';
import classes from './SignUp.module.scss';

const SignUp = ({ firestore, firebase }) => {
  console.log(firestore);
  const handleSubmitPassword = ev => {
    ev.preventDefault();
    const { firstname, lastname, email, password } = ev.target.elements;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(result => {
        result.user.updateProfile({
          displayName: `${firstname.value} ${lastname.value}`,
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
            firstname: firstname.value,
            lastname: lastname.value,
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
  const handleAuthRegistrarGoogle = () => {};
  return (
    <div className={classes.SignUp}>
      <div className={classes.boxHeadign}>
        <h4>Registrate en DPipette</h4>
      </div>
      <div className={classes.boxForm}>
        <form onSubmit={handleSubmitPassword}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="firstname" className="form-control" />
          </div>
          <div className="form-group">
            <label>Apellidos</label>
            <input type="text" name="lastname" className="form-control" />
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
