import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './UserProfile.module.scss';

const imgUser = require('../.../../../../../../../assets/images/virginia.jpg');

class UserProfile extends Component {
  state = {
    isMenu: false,
    fade: false,
    porcentStorage: 30,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleHideMenu);
    this.fadeMenu.addEventListener('animationend', this.handleHideMenu);
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

  render() {
    const { userSign } = this.props;
    const { isMenu, fade, porcentStorage } = this.state;

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
    let showMenu = null;
    if (isMenu) {
      showMenu = (
        <div
          className={[
            classes.isMenuOpen,
            fade ? classes.FadeOn : classes.FadeOff,
          ].join(' ')}>
          <div className={classes.Triangule} />
          <ul>
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
              <Link to="/login">
                <i className="bx bx-log-in" />
                Salir
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <>
        <div className={classes.UserProfile}>
          {userSign ? (
            <div className={classes.CircleImg}>
              <img src={imgUser} alt="El imagen de perfil" />
            </div>
          ) : (
            <div
              className={classes.CircleAnomy}
              title="El imagen de desconocido">
              VS
            </div>
          )}

          <p style={btnShow}>Virginia Velásquez</p>
          <button
            type="button"
            className={classes.btnMenuUser}
            onMouseOver={this.handleShowMenu}
            ref={a => (this.fadeMenu = a)}
            title="Menu">
            <i className="bx bx-chevron-down" style={btnShow} />
          </button>
          <div>{showMenu}</div>
        </div>
      </>
    );
  }
}

export default UserProfile;
