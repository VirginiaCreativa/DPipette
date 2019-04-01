import React from 'react';
import classes from './Header.module.scss';
import Logo from '../Logo/Logo';
import Navigations from './Navigations/Navigations';

const header = () => (
  <>
    <header className={classes.Header}>
      <div className="container-full">
        <div className="row">
          <div className="col-2">
            <Logo />
          </div>
          <div className="col-10">
            <Navigations />
          </div>
        </div>
      </div>
    </header>
  </>
);

export default header;
