import React from 'react';
import classes from './Layout.module.scss';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

const Layout = ({ children }) => (
  <div className={classes.Layout}>
    <Header />
    <Sidebar />
    <div className={classes.Wrapper}>
      <div className="container-fluid">{children}</div>
    </div>
  </div>
);

export default Layout;
