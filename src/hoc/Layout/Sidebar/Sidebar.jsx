import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Sidebar.module.scss';

const Sidebar = () => (
  <div className={classes.Sidebar}>
    <React.Fragment>
      <NavLink to="/" exact activeClassName="selected" className="linkActive">
        <i className="icon-home-outline" title="El icono de Home" />
      </NavLink>
      <NavLink
        to="/significados"
        exact
        activeClassName="selected"
        className="linkActive">
        <i className="icon-funnel-outline" title="El icono de Significados" />
      </NavLink>
      <NavLink
        to="/notescornell"
        activeClassName="selected"
        className="linkActive">
        <i className="icon-book-outline" title="El icono de Notas Cornell" />
      </NavLink>
      <NavLink
        to="/documentos"
        activeClassName="selected"
        className="linkActive">
        <i className="icon-file-text-outline" title="El icono de Documentos" />
      </NavLink>
      <NavLink to="/foros" activeClassName="selected" className="linkActive">
        <i className="icon-message-circle-outline" title="El icono de Foros" />
      </NavLink>
    </React.Fragment>
  </div>
);

export default Sidebar;
