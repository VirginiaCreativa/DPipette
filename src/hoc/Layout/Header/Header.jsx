import React from 'react';
import classes from './Header.module.scss';
import Logo from '../Logo/Logo';
import Navigations from './Navigations/Navigations';

const ContextA = React.createContext();

const header = () => (
  <>
    <header className={classes.Header}>
      <div className="container-full">
        <Navigations />
      </div>
    </header>
  </>
);

export default header;
