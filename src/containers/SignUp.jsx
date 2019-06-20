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
            mobile: null,
            country: null,
            city: null,
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
            mobile: null,
            country: null,
            city: null,
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
          <button
            type="submit"
            className={[classes.btnRegistra, 'btn btn-success btn-block'].join(
              ' '
            )}>
            Registrate
          </button>
        </form>
        <button
          type="button"
          onClick={handleAuthRegistrarGoogle}
          className={[classes.btnGoogle, 'btn'].join(' ')}>
          <img
            alt="icon de Google"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZCQkIwMDsiIGQ9Ik0xMTMuNDcsMzA5LjQwOEw5NS42NDgsMzc1Ljk0bC02NS4xMzksMS4zNzhDMTEuMDQyLDM0MS4yMTEsMCwyOTkuOSwwLDI1NiAgYzAtNDIuNDUxLDEwLjMyNC04Mi40ODMsMjguNjI0LTExNy43MzJoMC4wMTRsNTcuOTkyLDEwLjYzMmwyNS40MDQsNTcuNjQ0Yy01LjMxNywxNS41MDEtOC4yMTUsMzIuMTQxLTguMjE1LDQ5LjQ1NiAgQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1MThFRjg7IiBkPSJNNTA3LjUyNywyMDguMTc2QzUxMC40NjcsMjIzLjY2Miw1MTIsMjM5LjY1NSw1MTIsMjU2YzAsMTguMzI4LTEuOTI3LDM2LjIwNi01LjU5OCw1My40NTEgIGMtMTIuNDYyLDU4LjY4My00NS4wMjUsMTA5LjkyNS05MC4xMzQsMTQ2LjE4N2wtMC4wMTQtMC4wMTRsLTczLjA0NC0zLjcyN2wtMTAuMzM4LTY0LjUzNSAgYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOEI0NDY7IiBkPSJNNDE2LjI1Myw0NTUuNjI0bDAuMDE0LDAuMDE0QzM3Mi4zOTYsNDkwLjkwMSwzMTYuNjY2LDUxMiwyNTYsNTEyICBjLTk3LjQ5MSwwLTE4Mi4yNTItNTQuNDkxLTIyNS40OTEtMTM0LjY4MWw4Mi45NjEtNjcuOTFjMjEuNjE5LDU3LjY5OCw3Ny4yNzgsOTguNzcxLDE0Mi41Myw5OC43NzEgIGMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0YxNDMzNjsiIGQ9Ik00MTkuNDA0LDU4LjkzNmwtODIuOTMzLDY3Ljg5NmMtMjMuMzM1LTE0LjU4Ni01MC45MTktMjMuMDEyLTgwLjQ3MS0yMy4wMTIgIGMtNjYuNzI5LDAtMTIzLjQyOSw0Mi45NTctMTQzLjk2NSwxMDIuNzI0bC04My4zOTctNjguMjc2aC0wLjAxNEM3MS4yMyw1Ni4xMjMsMTU3LjA2LDAsMjU2LDAgIEMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
          />
        </button>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(['users']),
  connect()
)(SignUp);
