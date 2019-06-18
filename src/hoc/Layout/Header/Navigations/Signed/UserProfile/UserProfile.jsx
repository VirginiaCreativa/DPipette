import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import classes from './UserProfile.module.scss';

const imgUser = require('../.../../../../../../../assets/icons/user_unknown.svg');

class UserProfile extends Component {
  state = {
    isMenu: false,
    fade: false,
    porcentStorage: 30,
    userSign: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleHideMenu);
    this.fadeMenu.addEventListener('animationend', this.handleHideMenu);
    const user = this.props.firebase.auth().currentUser;
    if (user) this.setState({ userSign: true });
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleHideMenu);
    this.fadeMenu.removeEventListener('animationstart', this.handleShowMenu);
  }

  handleShowMenu = () => {
    this.setState(prevState => ({
      isMenu: !prevState.isMenu,
      fade: true,
    }));
  };

  handleHideMenu = e => {
    const xClose = e.offsetX;
    const yClose = e.offsetY;
    if (xClose >= '800' || yClose >= '220') {
      this.setState({
        isMenu: false,
        fade: false,
      });
    }
  };

  handleLoginOut = () => {
    this.props.firebase.logout();
  };

  photoProfile = () => {
    const currentUser = this.props.firebase.auth().currentUser;
    const userPass = this.props.profile;
    let photoProfile;
    if (currentUser) {
      if (currentUser.providerData[0].providerId === 'google.com') {
        photoProfile = currentUser.photoURL;
      } else if (
        currentUser.providerData[0].providerId === 'password' &&
        userPass.photo === ''
      ) {
        photoProfile = imgUser;
      } else {
        photoProfile = userPass.photo;
      }
    } else {
      console.log('ERROR');
    }
    return photoProfile;
  };

  render() {
    const { profile } = this.props;
    const { userSign, isMenu, fade, porcentStorage } = this.state;
    let btnShow;
    if (fade) {
      btnShow = { color: '#1948ca' };
    } else {
      btnShow = { color: '#a4b0be' };
    }

    const cantPorce = {
      borderBottom: '3px solid #2572dd',
      width: `${porcentStorage}%`,
      zIndex: 3,
      position: 'absolute',
      display: 'block',
    };

    if (fade) {
      btnShow = { color: '#1948ca' };
    }

    return (
      <>
        <div className={classes.UserProfile}>
          {userSign && (
            <div className={classes.CircleImg}>
              <img src={this.photoProfile()} alt="El imagen de perfil" />
            </div>
          )}
          <button
            type="button"
            className={classes.btnMenuUser}
            onMouseOver={this.handleShowMenu}
            ref={a => (this.fadeMenu = a)}
            title="Menu">
            <i className="bx bx-dots-vertical-rounded" style={btnShow}></i>
          </button>
          <div>
            {isMenu && (
              <div
                className={[
                  classes.isMenuOpen,
                  fade ? classes.FadeOn : classes.FadeOff,
                ].join(' ')}>
                <div className={classes.Triangule} />
                <ul>
                  <li>
                    <p className={classes.boxName} style={btnShow}>
                      {profile.namefull}
                    </p>
                  </li>
                  <li className={classes.Storage}>
                    <div className={classes.infoStorage}>
                      <p>4,2 GB de 15 GB usado</p>
                      <div className={classes.linePorce}>
                        <div style={cantPorce} />
                        <div className={classes.bgPorce} />
                      </div>
                    </div>
                    <Link to="/almacenamiento" tabIndex="0">
                      <i className="bx bx-cloud" />
                      Almacenamiento
                    </Link>
                  </li>
                  <li>
                    <Link to="/perfil" tabIndex="-1">
                      <i className="bx bxs-user-circle" />
                      Perfíl
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuracion" tabIndex="0">
                      <i className="bx bx-cog" />
                      Configuración
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={this.handleLoginOut}>
                      <i className="bx bx-log-in" />
                      Salir
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  }))
)(UserProfile);
