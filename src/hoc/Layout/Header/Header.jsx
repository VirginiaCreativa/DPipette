import React from 'react';
import classes from './Header.module.scss';
import Logo from '../Logo/Logo';
import ProgramCreate from './ProgramCreate/ProgramCreate';

const ContextA = React.createContext();

const header = () => (
  <>
    <header className={classes.Header}>
      {/* <div className="container-full">
        <ProgramCreate />
      </div> */}
    </header>
  </>
);

export default header;
