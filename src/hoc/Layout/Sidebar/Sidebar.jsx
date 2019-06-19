import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import Logo from '../Logo/Logo';
import Signed from './Signed/Signed';
import Setting from './Setting/Setting';
import classes from './Sidebar.module.scss';

import { getOpenSetting } from '../../../redux/actions/LayoutAction';

class Sidebar extends Component {
  state = {
    onOpenSetting: false,
    onFade: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.moveMenuSettingHide);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isEmpty } = this.props;
    if (isEmpty !== prevProps.isEmpty) this.setState({ onOpenSetting: false });
  }

  moveMenuSettingHide = ev => {
    if (ev.clientX >= '620') this.setState({ onOpenSetting: false });
  };

  handleOnSetting = () => {
    const { onOpenSetting } = this.state;
    this.setState(prevState => ({ onOpenSetting: !prevState.onOpenSetting }));
  };

  render() {
    const { onOpenSetting, onFade } = this.state;
    let sideSetting;
    if (onOpenSetting) {
      sideSetting = {
        boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.08)',
      };
      getOpenSetting('#2572dd');
    } else {
      getOpenSetting('#9ca7b4');
    }
    return (
      <>
        <div className={classes.Sidebar} style={sideSetting}>
          <Logo />
          <NavLink
            to="/"
            exact
            activeClassName="selected"
            className="linkActive">
            <i className="icon-home-outline" title="El icono de Home" />
          </NavLink>
          <NavLink
            to="/significados"
            exact
            activeClassName="selected"
            className="linkActive">
            <i
              className="icon-funnel-outline"
              title="El icono de Significados"
            />
          </NavLink>
          <NavLink
            to="/notescornell"
            activeClassName="selected"
            className="linkActive">
            <i
              className="icon-book-outline"
              title="El icono de Notas Cornell"
            />
          </NavLink>
          <NavLink
            to="/documentos"
            activeClassName="selected"
            className="linkActive">
            <i
              className="icon-file-text-outline"
              title="El icono de Documentos"
            />
          </NavLink>
          <NavLink
            to="/foros"
            activeClassName="selected"
            className="linkActive">
            <i
              className="icon-message-circle-outline"
              title="El icono de Foros"
            />
          </NavLink>
          <Signed
            className={classes.boxSigned}
            onSettign={this.handleOnSetting}
          />
        </div>
        {onOpenSetting && (
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
  bindActionCreators({ getOpenSetting }, dispatch);

export default compose(
  firebaseConnect(),
  connect(
    ({
      firebase: {
        auth: { isEmpty },
      },
    }) => ({ isEmpty }),
    mapDispatchToProps
  )
)(Sidebar);
