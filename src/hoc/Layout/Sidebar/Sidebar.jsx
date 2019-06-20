import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import Logo from '../Logo/Logo';
import Signed from './Signed/Signed';
import Setting from './Setting/Setting';
import classes from './Sidebar.module.scss';

import {
  activeSetting,
  getOnSetting,
} from '../../../redux/actions/LayoutAction';

class Sidebar extends Component {
  state = {
    onFade: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.moveMenuSettingHide);
    document.addEventListener('click', this.overMenuSettingHide);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isEmpty } = this.props;
    if (isEmpty !== prevProps.isEmpty) this.props.getOnSetting(false);
  }

  moveMenuSettingHide = ev => {
    if (ev.clientX >= '660') this.props.getOnSetting(false);
  };

  overMenuSettingHide = ev => {
    console.log(ev.target.dataset.menusetting);
    if (ev.target.tabIndex === 0 || ev.target.dataset.menusetting) {
      this.props.getOnSetting(false);
    }
  };

  handleOnSetting = () => {
    this.props.getOnSetting(!this.props.onSetting);
  };

  render() {
    const { onFade } = this.state;
    const { onSetting } = this.props;
    let sideSetting;
    if (onSetting) {
      sideSetting = {
        boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.08)',
      };
      this.props.activeSetting('#2572dd');
    } else {
      this.props.activeSetting('#9ca7b4');
    }
    return (
      <>
        <div className={classes.Sidebar} style={sideSetting}>
          <Logo />
          <nav>
            <NavLink
              to="/"
              exact
              data-menusetting="0"
              activeClassName="selected"
              className="linkActive">
              <i
                className="icon-home-outline"
                data-menusetting="0"
                title="El icono de Home"
              />
            </NavLink>
            <NavLink
              to="/significados"
              exact
              data-menusetting="0"
              activeClassName="selected"
              className="linkActive">
              <i
                data-menusetting="0"
                className="icon-funnel-outline"
                title="El icono de Significados"
              />
            </NavLink>
            <NavLink
              to="/notescornell"
              data-menusetting="0"
              activeClassName="selected"
              className="linkActive">
              <i
                data-menusetting="0"
                className="icon-book-outline"
                title="El icono de Notas Cornell"
              />
            </NavLink>
            <NavLink
              to="/documentos"
              data-menusetting="0"
              activeClassName="selected"
              className="linkActive">
              <i
                data-menusetting="0"
                className="icon-file-text-outline"
                title="El icono de Documentos"
              />
            </NavLink>
            <NavLink
              to="/foros"
              data-menusetting="0"
              activeClassName="selected"
              className="linkActive">
              <i
                data-menusetting="0"
                className="icon-message-circle-outline"
                title="El icono de Foros"
              />
            </NavLink>
          </nav>
          <Signed
            className={classes.boxSigned}
            onSettign={this.handleOnSetting}
          />
        </div>
        {onSetting && (
          <div
            className={[
              classes.boxOpenSetting,
              onFade ? classes.FadeOff : classes.FadeOn,
            ].join(' ')}>
            <Setting />
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ activeSetting, getOnSetting }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    state => ({
      isEmpty: state.firebase.auth.isEmpty,
      onSetting: state.Layout.onSetting,
    }),
    mapDispatchToProps
  )
)(Sidebar);
